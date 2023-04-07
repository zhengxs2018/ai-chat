import { useMemo } from 'react';

import MessageList from '@/components/message/MessageList';

import { useChat } from '../../../hooks/useChat';

export default function ChatMessageList() {
  const { data } = useChat();

  const messages = useMemo(() => {
    // eslint-disable-next-line prefer-destructuring
    const assistant = data.assistant;

    const list = [];
    const user = {
      id: '1',
      name: '我',
    };

    data.messages.forEach((item) => {
      if (item.role === 'system') return;

      const self = item.role === 'user';

      list.push({
        id: item.id,
        type: 'text',
        content: item.content,
        self,
        date: item.date,
        talker: self ? user : assistant,
      });
    });

    return list;
  }, [data.messages, data.assistant]);

  return (
    <div className="flex-1 flex items-stretch min-h-0 overflow-hidden">
      <MessageList messages={messages} />
    </div>
  );
}
