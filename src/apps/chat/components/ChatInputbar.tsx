import { useState } from 'react';
import { CloudArrowDownIcon } from '@heroicons/react/24/outline';

import TippyButton from '@/components/base/TippyButton';
import MessageInputbar from '@/components/message/MessageInputbar';

export default function ChatInputbar() {
  const [loading] = useState(false);

  const handleSend = () => {
    // pass
  };

  return (
    <MessageInputbar loading={loading} onSend={handleSend}>
      <TippyButton
        tooltip="导出"
        placement="top"
        icon={<CloudArrowDownIcon className="w-6 h-6 text-gray-500" />}
        className="hover:bg-gray-200 active:bg-gray-300"
      />
    </MessageInputbar>
  );
}
