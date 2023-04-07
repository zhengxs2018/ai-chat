import { useEventListener, useMap } from 'ahooks';
import { useMemo } from 'react';

import {
  WebStorageAPI,
  WebStorageItem,
  WebStorageOptions,
  createWebStorage,
} from '@/shared/client/storage';

// 方便使用
export type { WebStorageItem, WebStorageOptions, WebStorageAPI };

export interface ILocalHistoryItem extends WebStorageItem {
  /**
   * 唯一标识
   *
   * 因为 Map 的特性，数字和字符串时不同的 key
   * 为了避免 bug，强制使用字符串
   */
  id: string;
  /**
   * 版本号
   *
   * 防止多窗口无限同步
   */
  version: number;
}

export type LocalHistoryOptions<
  Item extends ILocalHistoryItem = ILocalHistoryItem
> = WebStorageOptions<Item> & {
  /**
   * 初始值
   */
  initialValue?: Iterable<[string, Item]>;
  /**
   * 排序
   */
  onSort?: (a: Item, b: Item) => number;
  /**
   * 是否允许处理
   *
   * 第一次初始化时会调用
   */
  canProcess?: (item: Item) => boolean;
  /**
   * 是否允许删除
   */
  shouldDelete?: (op: 'event' | 'manual', item: Item) => boolean;
  /**
   * 是否允许同步
   */
  shouldSync?: (newItem: Item, oldItem?: Item) => boolean;
  /**
   * 是否允许清空数据
   */
  shouldClear?: (op: 'event' | 'manual') => boolean;
};

/**
 * 本地历史记录适配器
 *
 * TODO 这次排序的功能
 *
 * @remarks 用不同的浏览器标签页，对同一个对话操作，有可能导致同步异常
 *
 * @param prefix - 前缀
 * @param options - 配置
 * @returns
 */
export function useLocalHistory<
  Item extends ILocalHistoryItem = ILocalHistoryItem
>(prefix: string, options: LocalHistoryOptions<Item> = {}) {
  const {
    initialValue,
    onSort,
    canProcess = () => true,
    shouldSync = () => true,
    shouldDelete = () => true,
    shouldClear = () => true,
  } = options;

  // TODO 为减少复杂度，暂不考虑前缀变更的情况
  const ws = createWebStorage(prefix, options);

  const [store, op] = useMap(initialValue);

  // 防止外部意外操作数据
  const data = useMemo(
    () => Array.from(store.values()).sort(onSort),
    [store, onSort]
  );

  const forceClear = () => {
    op.setAll([]);
    ws.clear();
  };

  function forceRemove(id: string) {
    op.remove(id);
    ws.removeItem(id);
  }

  function handleClear() {
    if (shouldClear('event')) forceClear();
  }

  /**
   * 监听 storage 事件
   * 解决多窗口数据同步问题
   */
  useEventListener('storage', ({ key, newValue }) => {
    // 用户清空了所有数据
    if (key == null) return handleClear();

    // 非当前前缀的数据不处理
    if (ws.containsKey(key) === false) return;

    const newItem = ws.tryDeserialize(newValue);

    // 删除数据
    if (!newItem) {
      const primaryId = ws.extractKey(key);
      if (store.has(primaryId) && shouldDelete('event', store.get(primaryId))) {
        op.remove(primaryId);
      }
      return;
    }

    // 需要同步
    const oldItem = op.get(key);

    const oldVersion = oldItem && oldItem.version ? oldItem.version : 0;
    const newVersion = newItem.version || 0;

    if (newVersion > oldVersion && shouldSync(newItem, oldItem)) {
      op.set(key, { ...oldItem, ...newItem });
    }
  });

  /**
   * 刷新数据
   *
   * 初次加载使用或用户主动调用
   */
  const refresh = () => {
    ws.forEach((item, id) => {
      if (canProcess(item)) {
        const oldItem = store.get(id);
        op.set(id, { ...oldItem, ...item });
      }
    });
  };

  return {
    /**
     * 仅用于方便调试，请勿使用
     */
    store,
    data,
    has(id: string) {
      return store.has(id);
    },
    /**
     *  获取数据
     *
     * @param id - 唯一标识
     * @returns
     */
    get(id: string) {
      return store.get(id);
    },
    /**
     * 强制创建
     */
    create(newItem: Item): Item {
      const primaryId = newItem.id;

      op.set(primaryId, newItem);
      ws.setItem(primaryId, newItem);

      return newItem;
    },
    set(id: string, key: string, value: unknown) {
      const item = store.get(id);
      if (!item) return;

      const newItem = { ...item, [key]: value };

      op.set(id, newItem);
      ws.setItem(id, newItem);
    },
    /**
     * 防止意外覆盖
     *
     * TODO 需要分离出来
     */
    upsert(newItem: Partial<Item> & { id: string }): Item {
      const primaryId = newItem.id.toString();
      const oldItem = store.get(primaryId);

      const version = oldItem ? oldItem.version : 0;
      const mergedItem = { ...oldItem, ...newItem, version: version + 1 };

      // hack 解决二级数组无法更新的问题
      store.set(primaryId, mergedItem);

      op.set(primaryId, mergedItem);
      ws.setItem(primaryId, mergedItem);

      return mergedItem;
    },
    delete(id: string) {
      if (shouldDelete('manual', store.get(id))) forceRemove(id);
    },
    refresh,
    clear() {
      if (shouldClear('manual')) forceClear();
    },
  } as const;
}
