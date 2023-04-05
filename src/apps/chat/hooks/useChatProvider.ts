import { createContext, useEffect } from 'react';

import { uuid } from '@/shared/client/uuid';

import { OpenAICreateChatParameters } from '../api/openai';
import { useCursor } from './useCursor';
import { useLocalHistory } from './useLocalHistory';
import { LocalState, useLocalState } from './useLocalState';

export type ChatAssistant = LocalState & {
  id: string;
  name: string;
  bio: string;
  prompt: string;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  type: 'text';
  content: string;
  date: number;
};

export type ChatItem = {
  id: string;
  version: number;
  title: string;
  assistant?: ChatAssistant;
  messages: ChatMessage[];
  date: number;
};

type ChatConfiguration = Omit<OpenAICreateChatParameters, 'messages'> &
  LocalState & {
    useAssistant: boolean;
  };

export function useChatProvider() {
  const [preferences, prefs] = useLocalState<ChatConfiguration>(
    'ai:chat:preferences',
    {
      initialValue: () => ({
        model: 'gpt-3.5-turbo',
        version: 0,
        max_tokens: 256,
        top_p: 1,
        n: 1,
        temperature: 0.7,
        frequency_penalty: 0,
        presence_penalty: 0,
        useAssistant: false,
      }),
    }
  );

  const [assistant] = useLocalState<ChatAssistant>('ai:chat:assistant', {
    initialValue: () => ({
      id: uuid(),
      name: '助手',
      version: 0,
      bio: '',
      prompt: '',
    }),
  });

  const history = useLocalHistory<ChatItem>('ai:chat:history:', {
    onSort(a, b) {
      return b.date - a.date;
    },
  });

  const cursor = useCursor(history.data);

  useEffect(() => {
    prefs.refresh();
    history.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    preferences,
    setPreference: prefs.set,
    assistant,
    data: history.data,
    cursor,
    get(id: string) {
      return history.get(id);
    },
    has(id: string) {
      return history.has(id);
    },
    create() {
      const item = {
        id: uuid(),
        title: '新对话',
        version: 0,
        messages: [],
        assistant,
        date: Date.now(),
      };

      if (preferences.useAssistant) {
        item.assistant = { ...assistant };
      }

      history.create(item);
    },
    remove(id: string) {
      history.delete(id);
    },
    clear() {
      history.clear();
    },
    /**
     * ChatGPT 需要接受所有消息
     * 但 set 的时候，数据是异步的
     * 所以需要返回新的消息列表
     *
     *  TODO 需要优化
     */
    addMessage(id: string, msg: ChatMessage) {
      const item = history.get(id);

      // hack 兼容异常数据
      if (!item) return [msg];

      const messages = item.messages.concat(msg);

      history.upsert({ id, messages });

      return messages;
    },
    clearMessages(id: string) {
      const item = history.get(id);
      if (!item) return;

      history.upsert({ id, messages: [] });
    },
  } as const;
}

export type ChatProvider = ReturnType<typeof useChatProvider>;

export const ChatContext = createContext<ChatProvider>(null);
