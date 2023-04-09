import { useFakeList } from '@ai-chat/fake-db';

import { ContactItem } from '../models';

export function useContacts() {
  return useFakeList<ContactItem>('contacts');
}
