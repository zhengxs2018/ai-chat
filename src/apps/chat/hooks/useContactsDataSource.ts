import { useFakeDataSource } from '@ai-chat/fake-db';

import { IContact } from '../models/contacts';

export function useContactsDataSource() {
  return useFakeDataSource<IContact>('contacts');
}
