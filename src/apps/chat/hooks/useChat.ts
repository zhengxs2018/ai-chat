import { useMemo } from 'react';
import { pick } from 'lodash-es';

import { uuid } from '@/shared/client/uuid';

import openai from '../api/openai';
import { useChatService } from './useChatService';
import { useSender } from './useSender';

export function useChat() {
  const service = useChatService();

  // TODO: 待优化
  const data = useMemo(
    () => service.data[service.cursor.index],
    [service.data, service.cursor.index]
  );

  const { sending, waiting, withRequest, abortRequest } = useSender();

  return {
    data,
    sending,
    waiting,
    send(input: string) {
      return withRequest(async (signal) => {
        const itemId = data.id;

        const newMessages = service.addMessage(itemId, {
          id: uuid(),
          role: 'user',
          type: 'text',
          content: input,
          date: Date.now(),
        });

        const payload = pick(service.preferences, [
          'model',
          'temperature',
          'max_tokens',
          'top_p',
          'frequency_penalty',
          'presence_penalty',
        ]);

        const messages = newMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

        const res = await openai.createChatCompletion(
          { ...payload, messages },
          { signal }
        );

        service.addMessage(itemId, {
          id: uuid(),
          role: 'assistant',
          type: 'text',
          content: res.choices[0].message.content,
          date: Date.now(),
        });
      });
    },
    clearMessages() {
      service.clearMessages(data.id);
    },
    abort: abortRequest,
  };
}
