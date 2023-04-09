import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { MessageList } from '@ai-chat/chat-ui';

import { useChat } from '../../hooks/useChat';
import ChatInputbar from './components/ChatInputbar';

export default function Chat() {
  const navigate = useNavigate();
  const { chatId } = useParams();

  const [payload, messages] = useChat(chatId);

  useEffect(() => {
    if (!payload) return navigate('/chats');
  }, [payload]);

  if (!(payload && payload.talker)) return;

  return (
    <div className="flx-1 flex flex-col h-full w-full">
      <header
        className={`flex justify-between items-center min-h-[60px] h-[60px] px-[20px] bg-white border-b-[1px]`}
      >
        {payload.talker.name}
      </header>

      <div className="flex-1 flex flex-col items-stretch min-h-0 overflow-hidden">
        <MessageList className="flex-1" messages={messages}></MessageList>
        <ChatInputbar />
      </div>
    </div>
  );
}
