import { useMemo } from 'react';

import { useContactsDataSource } from './useContactsDataSource';
import { useChatsDataSource } from './useChatsDataSource';

export function useContact(contactId: string) {
  const chats = useChatsDataSource();
  const contacts = useContactsDataSource();
  const payload = useMemo(() => contacts.get(contactId), [contacts, contactId]);

  const op = {
    remove() {
      chats.remove(contactId);
      contacts.remove(contactId);
    },
  };

  return [payload, op] as const;
}
