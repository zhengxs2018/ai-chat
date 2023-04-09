import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

import { MessageInputbar } from '@ai-chat/chat-ui';

import TippyButton from '@/components/base/TippyButton';

export default function ChatInputbar() {
  const [sending, setSending] = useState(false);

  function clearMessages() {
    // pass
  }

  const handleSend = async (value: string) => {
    // pass
  };

  return (
    <MessageInputbar loading={sending} onSend={handleSend}>
      <TippyButton
        tooltip="清空消息"
        placement="top"
        icon={<TrashIcon className="w-6 h-6 text-gray-500" />}
        className="hover:bg-gray-200 active:bg-gray-300"
        onClick={clearMessages}
      />
    </MessageInputbar>
  );
}
