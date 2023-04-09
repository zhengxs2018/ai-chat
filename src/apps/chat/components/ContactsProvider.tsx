import React from 'react';

import { contacts, ContactItem } from '../models';
import { useTable, Table } from '../hooks';

export const ContactsContext = React.createContext<Table<ContactItem>>(null);

export default function ContactsProvider({
  children,
}: React.PropsWithChildren) {
  const table = useTable(contacts);

  return (
    <ContactsContext.Provider value={table}>
      {children}
    </ContactsContext.Provider>
  );
}
