import { useFakeDataSource } from '@ai-chat/fake-db';

import { INote } from '../models';

export type { INote };

export function useNotesDataSource() {
  return useFakeDataSource<INote>('notes');
}
