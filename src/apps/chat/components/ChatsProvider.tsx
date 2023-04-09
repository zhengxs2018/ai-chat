import React from 'react';
import { useList } from 'react-use';

import { chats, ChatItem } from '../models';

export type ChatsService<T> = {
  items: T[];
  get(id: string): T;
  create(item: Partial<Omit<ChatItem, 'id' | 'version'>>): ChatItem;
  update(item: Partial<ChatItem> & { id: string }): ChatItem;
};

export const ChatsContext = React.createContext<ChatsService<ChatItem>>(null);

function isSame(a: ChatItem, b: ChatItem) {
  return a.id === b.id;
}

export default function ChatsProvider({ children }: React.PropsWithChildren) {
  const [items, op] = useList(chats.values() as ChatItem[]);

  const record = React.useMemo(() => {
    const record = {};
    for (const item of items) {
      record[item.id] = item;
    }
    return record;
  }, [items]);

  function get(id: string) {
    return record[id];
  }

  function create(item: Partial<Omit<ChatItem, 'id' | 'version'>>) {
    const newItem = chats.create(item);
    op.push(newItem);
    return newItem;
  }

  function update(item: ChatItem) {
    const newItem = chats.update(item);
    op.update(isSame, newItem);
    return newItem;
  }

  return (
    <ChatsContext.Provider value={{ items, get, create, update }}>
      {children}
    </ChatsContext.Provider>
  );
}
