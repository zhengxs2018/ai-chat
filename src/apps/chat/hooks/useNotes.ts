import { useFakeList } from '@ai-chat/fake-db';

import { INote } from '../models';

export function useNotes() {
  return useFakeList<INote>('notes');
}
