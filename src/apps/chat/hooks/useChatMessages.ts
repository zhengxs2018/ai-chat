import { useMemo } from 'react';

import { IChatWithContact } from '../models/chats';

import { useMessages } from './useMessages';
import { useCurrentUser } from './useCurrentUser';

export function useChatMessages(chat: IChatWithContact) {
  const [user] = useCurrentUser();
  const messages = useMessages();

  return useMemo(() => {
    const chatId = chat.id;
    const talker = chat.talker;

    const items = messages.findMany((item) => item.chat_id === chatId);

    return items
      .filter((item) => item.role !== 'system') // 过滤系统消息
      .map((item) => {
        // 标记自己的消息
        const self = item.role === 'user';

        return {
          ...item,
          // 为了兼容 MessageList 组件，这里需要把 user 和 talker 互换
          talker: self ? user : talker,
          self,
        };
      });
  }, [user, chat, messages]);
}
