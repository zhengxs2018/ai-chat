import { MessageList } from '@ai-chat/chat-ui';

import type { IChatWithContact } from '../../../models/chats';
import { useChatMessages } from '../../../hooks/useChatMessages';

export type ChatMessagesProps = {
  className?: string;
  chat: IChatWithContact;
};

export default function ChatMessages({ className, chat }: ChatMessagesProps) {
  const messages = useChatMessages(chat);

  return <MessageList className={className} messages={messages}></MessageList>;
}
