import { useMemo } from 'react';

import { useChats } from './useChats';
import { useMessages } from './useMessages';

export function useChat(chatId: string) {
  const chatList = useChats();
  const msgList = useMessages();

  const info = useMemo(() => chatList.get(chatId), [chatList, chatId]);

  const messages = useMemo(
    () => msgList.findMany((item) => item.chat_id === chatId),
    [msgList, chatId]
  );

  const send = (content: string) => {
    const message = msgList.create({
      chat_id: chatId,
      content,
      role: 'user',
    });

    console.log(message);
  };

  return [info, messages, send] as const;
}
