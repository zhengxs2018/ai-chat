import { useFakeDataSource } from '@ai-chat/fake-db';

import { IContact } from '../models';

export function useContactsDataSource() {
  return useFakeDataSource<IContact>('contacts');
}
