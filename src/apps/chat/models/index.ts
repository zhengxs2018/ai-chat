import { createFakeDB } from '@ai-chat/fake-db';

import chats, { ChatItem } from './chats';
import contacts, { ContactItem } from './contacts';
import messages, { MessageItem } from './messages';

export type { ChatItem, ContactItem, MessageItem };

export { chats, contacts, messages };

export default createFakeDB('ai-chat-app', {
  tables: [chats, contacts, messages],
});
