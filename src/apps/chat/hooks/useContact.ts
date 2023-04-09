import { useMemo } from 'react';

import { useContacts } from './useContacts';

export function useContact(contactId: string) {
  const contacts = useContacts();
  const contact = useMemo(() => contacts.get(contactId), [contacts, contactId]);

  return [contact] as const;
}
