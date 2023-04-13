import { createFakeDB } from '@ai-chat/fake-db';

import chats, { IChat } from './chats';
import contacts, { IContact } from './contacts';
import messages, { IMessage } from './messages';

export type { IChat, IContact, IMessage };

export default createFakeDB('ai-chat-app', {
  tables: [chats, contacts, messages],
});
