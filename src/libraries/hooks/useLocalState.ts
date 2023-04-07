import { useEventListener } from 'ahooks';
import { useState } from 'react';

import {
  WebStorageAPI,
  WebStorageItem,
  WebStorageOptions,
  createWebStorage,
} from '@/shared/client/storage';

// 方便使用
export type { WebStorageItem, WebStorageOptions, WebStorageAPI };

export interface LocalState extends WebStorageItem {
  /**
   * 版本号
   *
   * 防止多窗口无限同步
   */
  version: number;
}

export type LocalStateOptions<State extends LocalState = LocalState> =
  WebStorageOptions<State> & {
    /**
     * 初始值
     */
    initialValue: () => State;
    /**
     * 是否允许同步
     */
    shouldSync?: (newState: State, oldState?: State) => boolean;
    /**
     * 是否允许重置
     */
    shouldRest?: (op: 'event' | 'manual') => boolean;
  };

export function useLocalState<State extends LocalState = LocalState>(
  prefix: string,
  options: LocalStateOptions<State>
) {
  const {
    initialValue,
    shouldSync = () => true,
    shouldRest = () => true,
  } = options;

  // TODO 为减少复杂度，暂不考虑前缀变更的情况
  const ws = createWebStorage(prefix, options);

  const [preferences, setPreferences] = useState(initialValue);

  const forceReset = () => {
    const initial = initialValue();

    setPreferences(initial);
    ws.setItem('', initial);
  };

  const handleRest = () => {
    if (shouldRest('event')) forceReset();
  };

  /**
   * 监听 storage 事件
   * 解决多窗口数据同步问题
   */
  useEventListener('storage', ({ key, newValue }) => {
    // 用户清空了所有数据
    if (key == null) return handleRest();

    // 非当前配置不处理
    if (key !== ws.buildKey('')) return;

    const newState = ws.tryDeserialize(newValue);
    if (!newState) return handleRest();

    // 需要同步
    const oldState = preferences;
    const oldVersion = oldState.version || 0;
    const newVersion = newState.version || 0;

    if (newVersion > oldVersion && shouldSync(newState, oldState)) {
      setPreferences((prev) => ({ ...prev, ...newState }));
    }
  });

  /**
   * 刷新数据
   *
   * 初次加载使用或用户主动调用
   */
  const refresh = () => {
    const state = ws.getItem('');
    if (state) setPreferences(state);
  };

  return [
    preferences,
    {
      get(key: string) {
        return preferences[key];
      },
      set(key: keyof State, value: State[keyof State]) {
        setPreferences((prev) => {
          const version = (prev.version || 0) + 1;
          const mergedState = { ...prev, [key]: value, version };
          ws.setItem('', mergedState);
          return mergedState;
        });
      },
      refresh,
      reset() {
        if (shouldRest('manual')) forceReset();
      },
    },
  ] as const;
}
