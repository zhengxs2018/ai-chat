import { FakeTable } from '@ai-chat/fake-db';
import { v4 as uuid } from 'uuid';

export type MessageItem = {
  id: string;
  version: number;
  type: string;
  role: string;
  content: string;
  chat_id: string;
  date: Date;
};

export default FakeTable.build<MessageItem>({
  name: 'messages',
  fields: [
    { name: 'id', type: 'string', default: uuid },
    { name: 'version', type: 'int', required: true },
    { name: 'type', type: 'string', default: 'text' },
    { name: 'role', type: 'string', required: true },
    { name: 'content', type: 'string', required: true },
    { name: 'chat_id', type: 'string', required: true },
    { name: 'date', type: 'date', default: () => new Date() },
  ],
});
