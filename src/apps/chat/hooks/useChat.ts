import { useMemo } from 'react';

import type { IChatWithContact } from '../models/chats';

import { useContacts } from './useContacts';
import { useChats } from './useChats';
import { useMessages } from './useMessages';

export function useChatWithTalker(chatId: string) {
  const contacts = useContacts();
  const chats = useChats();
  const messages = useMessages();

  const payload = useMemo<IChatWithContact>(() => {
    const data = chats.get(chatId);
    const talkerId = data?.talker_id;
    const talker = contacts.findFirst((item) => item.id === talkerId);

    return { ...data, talker };
  }, [chats, contacts, chatId]);

  const send = (content: string) => {
    messages.create({
      chat_id: chatId,
      content,
      role: 'user',
    });
  };

  return [payload, { send }] as const;
}
