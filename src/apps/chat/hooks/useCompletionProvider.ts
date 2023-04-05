import { createContext, useEffect } from 'react';

import { uuid } from '@/shared/client/uuid';

import { OpenAICreateCompletionParameters } from '../api/openai';
import { useCursor } from './useCursor';
import { useLocalHistory } from './useLocalHistory';
import { LocalState, useLocalState } from './useLocalState';

export type CompletionVersionMessage = {
  content: string;
  date: number;
};

export type CompletionItem = {
  id: string;
  title: string;
  version: number;
  content: string;
  versions: CompletionVersionMessage[]; // 防止内容占用过大，暂不启用多版本功能
  status: 'draft' | 'complete';
  date: number;
};

type CompletionConfiguration = LocalState &
  Omit<OpenAICreateCompletionParameters, 'prompt'> & {
    useVersions: boolean;
  };

export function useCompletionProvider() {
  const [preferences, prefs] = useLocalState<CompletionConfiguration>(
    'ai:complete:preferences',
    {
      initialValue: () => ({
        model: 'text-davinci-003',
        version: 0,
        max_tokens: 256,
        top_p: 1,
        n: 1,
        temperature: 0.7,
        frequency_penalty: 0,
        presence_penalty: 0,
        // stop: [],
        useVersions: false,
      }),
    }
  );

  const history = useLocalHistory<CompletionItem>('ai:complete:history:', {
    onSort(a, b) {
      return b.date - a.date;
    },
  });

  const cursor = useCursor(history.data);

  const create = () => {
    history.create({
      id: uuid(),
      title: 'New Note!',
      version: 0,
      content: '',
      versions: [],
      date: Date.now(),
      status: 'draft',
    });
  };

  const draft = (id: string, input: string) => {
    const item = history.get(id);

    // 可能在其他页面删除
    if (!item) {
      return history.create({
        id,
        title: 'New Note!',
        version: 0,
        content: '',
        versions: [],
        date: Date.now(),
        status: 'draft',
      });
    }

    if (item.status === 'complete') {
      history.upsert({
        id,
        content: input,
        status: 'draft',
      });
    } else {
      history.upsert({
        id,
        content: input,
        status: 'draft',
      });
    }
  };

  const complete = (id: string, result: string) => {
    const item = history.get(id);
    // 可能是异步请求后，本地数据被删除？
    if (!item) return;

    // 如果状态是完成的，说明是上次有会议的
    if (item.status === 'complete') {
      history.create({
        id,
        title: 'New Note!',
        version: 0,
        content: '',
        versions: [],
        date: Date.now(),
        status: 'draft',
      });
    } else {
      // 新增版本
      history.upsert({
        id,
        content: result,
      });
    }
  };

  useEffect(() => {
    prefs.refresh();
    history.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    preferences,
    setPreference: prefs.set,
    data: history.data,
    cursor,
    get(id: string) {
      return history.get(id);
    },
    create,
    has(id: string) {
      return history.has(id);
    },
    remove(id: string) {
      history.delete(id);
    },
    clear() {
      history.clear();
    },
    draft,
    complete,
  } as const;
}

export type CompletionProvider = ReturnType<typeof useCompletionProvider>;

export const CompletionContext = createContext<CompletionProvider>(null);
