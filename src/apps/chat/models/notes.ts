import { FakeTable, FakeRecord } from '@ai-chat/fake-db';

export interface INote extends FakeRecord {
  title: string;
  content: string;
}

export default FakeTable.build<INote>({
  name: 'notes',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'content', type: 'string' },
  ],
});
