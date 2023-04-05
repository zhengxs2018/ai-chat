import { useState } from 'react';
import MessageList from '@/components/message/MessageList';

export default function ChatMessageList() {
  const [messages] = useState([]);

  return (
    <div className="flex-1 flex items-stretch min-h-0 overflow-hidden">
      <MessageList messages={messages} />
    </div>
  );
}
