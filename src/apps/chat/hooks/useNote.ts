import { useMemo } from 'react';

import { useNotes, INote } from './useNotes';

export function useNote(noteId: string) {
  const notes = useNotes();
  const note = useMemo(() => notes.get(noteId), [notes, noteId]);

  function save(data: Partial<Omit<INote, 'id' | 'version'>>) {
    notes.update({ ...data, id: note.id });
  }

  return [note, { save }] as const;
}
