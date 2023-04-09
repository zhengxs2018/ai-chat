import { useMemo } from 'react';

import { useNotes } from './useNotes';

export function useNote(noteId: string) {
  const notes = useNotes();
  const note = useMemo(() => notes.get(noteId), [notes, noteId]);

  return [note] as const;
}
