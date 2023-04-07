import { pick } from 'lodash-es';
import { useMemo } from 'react';

import openai from '@/shared/client/openai';

import { useSender } from '@/libraries/hooks/useSender';

import { useCompletionService } from './useCompletionService';

export function useCompletion() {
  const service = useCompletionService();

  // TODO: 待优化
  const data = useMemo(
    () => service.data[service.cursor.index],
    [service.data, service.cursor.index]
  );

  const { sending, waiting, withRequest, abortRequest } = useSender();

  async function complete(input: string): Promise<string> {
    return withRequest(async (signal) => {
      const itemId = data.id;

      service.draft(itemId, input);

      const payload = pick(service.preferences, [
        'model',
        'temperature',
        'max_tokens',
        'top_p',
        'frequency_penalty',
        'presence_penalty',
      ]);

      const res = await openai.createCompletion(
        { ...payload, prompt: input },
        { signal }
      );

      const content = res.choices[0].text;
      service.complete(itemId, input + content);

      return content;
    });
  }

  return {
    data,
    sending,
    waiting,
    complete,
    setTitle(title) {
      service.set(data.id, 'title', title);
    },
    abort: abortRequest,
  };
}
