import { v4 as uuid } from 'uuid';

import { FakeTable } from '@ai-chat/fake-db';

export interface INote {
  id: string;
  version: number;
  title: string;
  content: string;
  date: Date;
}

export default FakeTable.build<INote>({
  name: 'notes',
  fields: [
    { name: 'id', type: 'string', default: uuid },
    { name: 'version', type: 'int', required: true },
    { name: 'title', type: 'string' },
    { name: 'content', type: 'string' },
    { name: 'date', type: 'date', default: () => new Date() },
  ],
});
