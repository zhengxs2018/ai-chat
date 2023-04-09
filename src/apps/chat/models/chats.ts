import { v4 as uuid } from 'uuid';

import { FakeTable } from '@ai-chat/fake-db';

export type ChatItem = {
  id: string;
  version: number;
  talker_id: string;
  date: Date;
};

export default FakeTable.build<ChatItem>({
  name: 'chats',
  fields: [
    { name: 'id', type: 'string', default: uuid },
    { name: 'version', type: 'int', required: true },
    { name: 'talker_id', type: 'string' },
    { name: 'date', type: 'date', default: () => new Date() },
  ],
});
