import { useMemo } from 'react';

import { useContacts } from './useContacts';

export function useContact(contactId: string) {
  const contacts = useContacts();
  const payload = useMemo(() => contacts.get(contactId), [contacts, contactId]);

  return [payload] as const;
}
