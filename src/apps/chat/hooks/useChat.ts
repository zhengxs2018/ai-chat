import { useMemo } from 'react';

import { useContacts } from './useContacts';
import { useChats } from './useChats';
import { useMessages } from './useMessages';

export function useChat(chatId: string) {
  const contacts = useContacts();
  const chats = useChats();
  const msgList = useMessages();

  const user = {
    id: 'user',
    name: '我',
  };

  const info = useMemo(() => chats.get(chatId), [chatId]);
  const talker = useMemo(
    () =>
      info ? contacts.findFirst((item) => item.id === info.talker_id) : null,
    [info]
  );
  const payload = useMemo(() => ({ ...info, talker }), [info, talker]);

  const messages = useMemo(() => {
    const items = msgList.findMany((item) => item.chat_id === chatId);

    return items
      .filter((item) => item.role !== 'system')
      .map((item) => {
        const self = item.role === 'user';

        return {
          ...item,
          talker: self ? user : talker,
          self,
        };
      });
  }, [msgList, chatId, talker]);

  const send = (content: string) => {
    const message = msgList.create({
      chat_id: chatId,
      content,
      role: 'user',
    });

    console.log(message);
  };

  return [payload, messages, info, send] as const;
}
