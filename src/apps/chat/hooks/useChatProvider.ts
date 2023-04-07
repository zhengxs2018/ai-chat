import { createContext, useEffect, useMemo } from 'react';

import { useLocalHistory } from '@/libraries/hooks/useLocalHistory';
import { LocalState, useLocalState } from '@/libraries/hooks/useLocalState';
import { useCursor } from '@/libraries/hooks/useCursor';

import type {
  ChatCompletionMessageRoleEnum,
  CreateChatCompletionRequest,
} from '@/libraries/openai';
import { uuid } from '@/shared/client/uuid';

export type ChatAssistant = LocalState & {
  id: string;
  name: string;
  bio: string;
  prompt: string;
};

export type ChatMessage = {
  id: string;
  role: ChatCompletionMessageRoleEnum;
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

type ChatConfiguration = Omit<CreateChatCompletionRequest, 'messages'> &
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
        max_tokens: 2048,
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

  // TODO: 待优化
  const current = useMemo(
    () => history.data[cursor.index],
    [history.data, cursor.index]
  );

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
    current,
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
    setTitle(id: string, title: string) {
      const item = history.get(id);

      // hack 兼容异常数据
      if (!item) return;

      history.set(id, 'title', title);
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
