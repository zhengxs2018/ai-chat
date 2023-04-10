import { v4 as uuid } from 'uuid';

import { FakeTable } from '@ai-chat/fake-db';

import type { IContact } from './contacts';

export interface IChat {
  id: string;
  version: number;
  talker_id: string;
  date: Date;
}

export interface IChatWithContact extends IChat {
  talker: IContact;
}

export default FakeTable.build<IChat>({
  name: 'chats',
  fields: [
    { name: 'id', type: 'string', default: uuid },
    { name: 'version', type: 'int', required: true },
    { name: 'talker_id', type: 'string' },
    { name: 'date', type: 'date', default: () => new Date() },
  ],
});
