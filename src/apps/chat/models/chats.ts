import { FakeTable, FakeRecord, FakeCreateInputWith } from '@ai-chat/fake-db';

import chats from '../data/chats.json';
import type { IContact } from './contacts';

export interface IChat extends FakeRecord {
  /**
   * 聊天室图标
   */
  logo?: string;
  /**
   * 聊天室名称
   */
  title: string;
  /**
   * 聊天室描述
   */
  description?: string;
  /**
   * 对话人ID
   */
  talker_id: string;
}

export type ChatCreateInput = FakeCreateInputWith<IChat>;

export interface IChatWithContact extends IChat {
  talker: IContact;
}

export default FakeTable.build<IChat>({
  name: 'chats',
  fields: [
    { name: 'logo', type: 'string' },
    { name: 'title', type: 'string', required: true },
    { name: 'description', type: 'string' },
    { name: 'talker_id', type: 'string' },
  ],
  initialValue: () => chats,
});
