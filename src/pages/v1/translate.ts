import type { APIRoute } from 'astro';

import openai from '@/shared/node/openai';
import { withHttpError, withLog, whenLogin } from '@/shared/node/middleware';

const chineseLangs = ['zh-Hans', 'zh-Hant', 'wyw', 'yue'];

type TranslateInput = {
  text: string;
  from: string;
  to: string;
  stream?: boolean;
};

export const post: APIRoute = withHttpError(
  withLog(
    whenLogin(async ({ request }) => {
      const payload: TranslateInput = await request.json();

      const response = await openai.createChatCompletion(
        JSON.stringify({
          model: 'gpt-3.5-turbo',
          temperature: 0,
          max_tokens: 1000,
          top_p: 1,
          frequency_penalty: 1,
          presence_penalty: 1,
          stream: payload.stream === true,
          messages: resolvePromptMessages(payload),
        })
      );

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        // TODO 直接透传 Headers 会响应失败？
        headers: {
          'content-type': response.headers.get('content-type'),
        },
      });
    })
  )
);

function isAWord(lang: string, text: string) {
  const Segmenter = Intl.Segmenter;
  if (!Segmenter) return false;

  const segmenter = new Segmenter(lang, { granularity: 'word' });
  const iterator = segmenter.segment(text)[Symbol.iterator]();
  return iterator.next().value?.segment === text;
}

function resolvePromptMessages({ to, from, text }: TranslateInput) {
  if (chineseLangs.includes(to)) {
    if (text.length < 5) {
      return [
        {
          role: 'system',
          content: `你是一个翻译引擎，请将给到的文本翻译成${to}。请列出3种（如果有）最常用翻译结果：单词或短语，并列出对应的适用语境（用中文阐述）、音标、词性、双语示例。按照下面格式用中文阐述：
          <序号><单词或短语> · /<音标>
          [<词性缩写>] <适用语境（用中文阐述）>
          例句：<例句>(例句翻译)`,
        },
      ];
    }

    if (isAWord(from, text)) {
      return [
        {
          role: 'system',
          content: `你是一个翻译引擎，请翻译给到的文本，只需要翻译不需要解释。当且仅当文本只有一个单词时，请给出单词原始形态（如果有）、单词的语种、对应的音标（如果有）、所有含义（含词性）、双语示例，至少三条例句，请严格按照下面格式给到翻译结果：
          <原始文本>
          [<语种>] · / <单词音标>
          [<词性缩写>] <中文含义>]
          例句：
          <序号><例句>(例句翻译)`,
        },
        { role: 'user', content: `"${text}"` },
      ];
    }
  }

  return [
    {
      role: 'system',
      content:
        'You are a translation engine that can only translate text and cannot interpret it.',
    },
    {
      role: 'user',
      content: `translate from ${from} to ${to}`,
    },
    { role: 'user', content: `"${text}"` },
  ];
}
