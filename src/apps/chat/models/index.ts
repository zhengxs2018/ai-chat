import { createFakeDB } from '@ai-chat/fake-db';

import chats, { IChat } from './chats';
import contacts, { IContact } from './contacts';
import messages, { IMessage } from './messages';
import notes, { INote } from './notes';

export type { IChat, IContact, IMessage, INote };

export default createFakeDB('ai-chat-app', {
  tables: [chats, contacts, messages, notes],
});
