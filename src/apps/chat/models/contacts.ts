import { FakeTable } from '@ai-chat/fake-db';
import { v4 as uuid } from 'uuid';

export interface IContact {
  id: string;
  version: number;
  name: string;
  avatar: string;
  bio: string;
  relationship?: string;
  hint?: string;
  hobbies?: string;
  prompt?: string;
  date: Date;
}

export default FakeTable.build<IContact>({
  name: 'contacts',
  fields: [
    { name: 'id', type: 'string', default: uuid },
    { name: 'version', type: 'int', required: true },
    { name: 'name', type: 'string', required: true },
    { name: 'avatar', type: 'string' },
    { name: 'bio', type: 'string' },
    { name: 'hint', type: 'string' },
    { name: 'prompt', type: 'string' },
    { name: 'date', type: 'date', default: () => new Date() },
  ],
});
