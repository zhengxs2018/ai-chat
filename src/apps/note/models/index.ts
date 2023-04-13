import { createFakeDB } from '@ai-chat/fake-db';

import notes, { INote } from './notes';

export type { INote };

export default createFakeDB('ai-note-app', {
  tables: [notes],
});
