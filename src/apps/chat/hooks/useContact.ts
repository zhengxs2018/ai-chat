import { useMemo } from 'react';

import { useContacts } from './useContacts';
import { useChats } from './useChats';

export function useContact(contactId: string) {
  const chats = useChats();
  const contacts = useContacts();
  const payload = useMemo(() => contacts.get(contactId), [contacts, contactId]);

  return [
    payload,
    {
      startChat() {
        chats.upsert({
          talker_id: payload.id,
        });
      },
      remove() {
        chats.remove(contactId);
        contacts.remove(contactId);
      },
    },
  ] as const;
}
