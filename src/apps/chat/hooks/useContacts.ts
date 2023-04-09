import { useFakeList } from '@ai-chat/fake-db';

import { IContact } from '../models';

export function useContacts() {
  return useFakeList<IContact>('contacts');
}
