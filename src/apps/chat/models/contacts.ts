import { FakeTable, FakeRecord, FakeCreateInputWith } from '@ai-chat/fake-db';

import contacts from '../data/contacts.json';

export interface IContact extends FakeRecord {
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 简介
   */
  bio?: string;
  /**
   * 与用户的关系
   */
  relationship?: string;
  /**
   * 对用户的称呼
   */
  callYou?: string;
  /**
   * 其他提示
   */
  hint?: string;
}

export type ContactCreateInput = FakeCreateInputWith<IContact>;

export default FakeTable.build<IContact>({
  name: 'contacts',
  fields: [
    { name: 'name', type: 'string', required: true },
    { name: 'avatar', type: 'string' },
    { name: 'bio', type: 'string' },
    { name: 'relationship', type: 'string' },
    { name: 'callYou', type: 'string' },
    { name: 'hint', type: 'string' },
  ],
  initialValue: () => contacts,
});
