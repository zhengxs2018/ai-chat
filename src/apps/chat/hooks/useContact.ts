import { useMemo } from 'react';

import { useContacts } from './useContacts';
import { useChats } from './useChats';

export function useContact(contactId: string) {
  const chats = useChats();
  const contacts = useContacts();
  const payload = useMemo(() => contacts.get(contactId), [contacts, contactId]);

  const op = {
    remove() {
      chats.remove(contactId);
      contacts.remove(contactId);
    },
  };

  return [payload, op] as const;
}
