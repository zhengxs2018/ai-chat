import { FakeTable, FakeRecord, FakeCreateInputWith } from '@ai-chat/fake-db';

export interface IMessage extends FakeRecord {
  type: string;
  role: 'user' | 'system' | 'assistant';
  content: string;
  chat_id: string;
}

export type ContactCreateInput = FakeCreateInputWith<IMessage>;

export default FakeTable.build<IMessage>({
  name: 'messages',
  fields: [
    { name: 'type', type: 'string', default: 'text' },
    { name: 'role', type: 'string', required: true },
    { name: 'content', type: 'string', required: true },
    { name: 'chat_id', type: 'string', required: true },
  ],
});
