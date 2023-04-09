import React from 'react';
import { useList } from 'react-use';

import { contacts, ContactItem } from '../models';

export type ContactsService<T> = {
  items: T[];
  get(id: string): T;
  create(item: Partial<Omit<ContactItem, 'id' | 'version'>>): ContactItem;
  update(item: Partial<ContactItem> & { id: string }): ContactItem;
};

export const ContactsContext =
  React.createContext<ContactsService<ContactItem>>(null);

function isSame(a: ContactItem, b: ContactItem) {
  return a.id === b.id;
}

export default function ContactsProvider({
  children,
}: React.PropsWithChildren) {
  const [items, op] = useList(contacts.values() as ContactItem[]);

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

  function create(item: Partial<Omit<ContactItem, 'id' | 'version'>>) {
    const newItem = contacts.create(item);
    op.push(newItem);
    return newItem;
  }

  function update(item: ContactItem) {
    const newItem = contacts.update(item);
    op.update(isSame, newItem);
    return newItem;
  }

  return (
    <ContactsContext.Provider value={{ items, get, create, update }}>
      {children}
    </ContactsContext.Provider>
  );
}
