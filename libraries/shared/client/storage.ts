export type WebStorageItem = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type WebStorageOptions<Item extends WebStorageItem = WebStorageItem> = {
  /**
   * 存储池
   */
  store?: Storage;
  /**
   * 序列化
   */
  serializer?: (item: Item) => string;
  /**
   * 反序列化
   */
  deserializer?: (item: string) => Item;
};

/**
 * localStorage 和 sessionStorage 的包装器，
 * 用于解决本地存储的命名空间问题。
 *
 * @param prefix - 前缀
 * @param options - 配置
 * @returns 本地存储操作API
 */
export function createWebStorage<Item extends WebStorageItem = WebStorageItem>(
  prefix: string,
  options?: WebStorageOptions<Item>
) {
  const {
    store = localStorage,
    serializer = (item) => JSON.stringify(item),
    deserializer = (item) => JSON.parse(item),
  } = options || {};

  function trySerialize(raw: Item): string | null {
    try {
      return serializer(raw);
    } catch {
      return null;
    }
  }

  function tryDeserialize(raw: string): Item {
    try {
      return deserializer(raw);
    } catch {
      return null;
    }
  }

  function buildKey(key: string) {
    return `${prefix}${key}`;
  }

  function containsKey(key: string) {
    return key.startsWith(prefix);
  }

  function extractKey(key: string) {
    return key.slice(prefix.length);
  }

  function forEach(callback: (key: string) => void) {
    for (let i = 0; i < store.length; ) {
      const key = store.key(i);
      if (containsKey(key)) callback(key);

      i++;
    }
  }

  return {
    nativeStore: store,
    trySerialize,
    tryDeserialize,
    containsKey,
    extractKey,
    buildKey,
    getItem(key: string): Item | null {
      return tryDeserialize(store.getItem(buildKey(key)));
    },
    setItem(key: string, item: Item): void {
      const serialized = trySerialize(item);
      if (serialized) return store.setItem(buildKey(key), serialized);
    },
    removeItem(key: string) {
      store.removeItem(buildKey(key));
    },
    clear() {
      forEach((key) => store.removeItem(key));
    },
    forEach(callback: (item: Item, key: string) => void) {
      forEach((key) => {
        const item = tryDeserialize(store.getItem(key));
        if (item) callback(item, extractKey(key));
      });
    },
  } as const;
}

export type WebStorageAPI<Item extends WebStorageItem = WebStorageItem> =
  ReturnType<typeof createWebStorage<Item>>;
