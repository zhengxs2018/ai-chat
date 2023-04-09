import React from 'react';
import { useList } from 'react-use';

import { messages, MessageItem } from '../models';

export type MessagesService<T> = {
  items: T[];
  get(id: string): T;
  create(item: Partial<Omit<MessageItem, 'id' | 'version'>>): MessageItem;
  update(item: Partial<MessageItem> & { id: string }): MessageItem;
  findMany(predicate: (item: T) => boolean): T[];
};

export const MessagesContext =
  React.createContext<MessagesService<MessageItem>>(null);

function isSame(a: MessageItem, b: MessageItem) {
  return a.id === b.id;
}

export default function MessagesProvider({
  children,
}: React.PropsWithChildren) {
  const [items, op] = useList(messages.values() as MessageItem[]);

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

  function create(item: Partial<Omit<MessageItem, 'id' | 'version'>>) {
    const newItem = messages.create(item);
    op.push(newItem);
    return newItem;
  }

  function update(item: MessageItem) {
    const newItem = messages.update(item);
    op.update(isSame, newItem);
    return newItem;
  }

  function findMany(predicate: (item: MessageItem) => boolean) {
    return items.filter(predicate);
  }

  return (
    <MessagesContext.Provider value={{ items, get, create, update, findMany }}>
      {children}
    </MessagesContext.Provider>
  );
}
