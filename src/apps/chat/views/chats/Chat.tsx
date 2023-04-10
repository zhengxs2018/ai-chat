import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';

import { MessageInputbar } from '@ai-chat/chat-ui';

import Alert from '@/components/base/Alert';
import TippyButton from '@/components/base/TippyButton';

import { useChatWithTalker } from '../../hooks/useChat';

import ChatMessages from './components/ChatMessages';

export default function Chat() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [sending] = useState(false);
  const [payload, op] = useChatWithTalker(chatId);

  const handleSend = (value: string) => {
    op.send(value);
  };

  useEffect(() => {
    if (!payload) return navigate('/chats');
  }, [payload, navigate]);

  return (
    <div className="flx-1 flex flex-col h-full w-full">
      <header
        className={`flex justify-between items-center min-h-[60px] h-[60px] px-[20px] bg-white border-b-[1px]`}
      >
        {payload.title}
      </header>
      <Alert
        type="warning"
        text="警告：AI可能偶尔产生不正确或有害的信息，请注意信息识别！"
      />
      <ChatMessages className="flex-1 bg-gray-100" chat={payload} />
      <MessageInputbar
        className="bg-gray-100"
        loading={sending}
        onSend={handleSend}
      >
        <TippyButton
          tooltip="清空消息"
          placement="top"
          icon={<TrashIcon className="w-6 h-6 text-gray-500" />}
          className="hover:bg-gray-200 active:bg-gray-300"
          onClick={() => op.clear()}
        />
      </MessageInputbar>
    </div>
  );
}
