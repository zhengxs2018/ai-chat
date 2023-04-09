import { useMemo } from 'react';

import { useChats } from './useChats';
import { useMessages } from './useMessages';

export function useChat(chatId: string) {
  const chatsService = useChats();
  const messagesService = useMessages();

  const info = useMemo(() => chatsService.get(chatId), [chatsService, chatId]);

  const messages = useMemo(
    () => messagesService.findMany((item) => item.chat_id === chatId),
    [messagesService, chatId]
  );

  const send = (content: string) => {
    const message = messagesService.create({
      chat_id: chatId,
      content,
      role: 'user',
    });

    console.log(message);
  };

  return [info, messages, send] as const;
}
