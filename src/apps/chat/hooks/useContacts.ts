import { useList } from 'react-use';

import { contacts, ContactItem } from '../models';

export function useContacts() {
  const [items, op] = useList<ContactItem>(contacts.values());

  return [items] as const;
}
