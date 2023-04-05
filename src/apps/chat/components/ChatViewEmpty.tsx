import { useState } from 'react';

import { PlusIcon } from '@heroicons/react/24/outline';
import TippyButton from '@/components/base/TippyButton';

import ChatSettingModel from './ChatSettingModel';

export default function ChatViewEmpty() {
  const [opened, setOpen] = useState(false);

  return (
    <div className="h-full w-full ai-fcc">
      <div className="text-center text-sm text-gray-400">
        <p className="mb-4">想要创建一个新会话？</p>

        <TippyButton
          tooltip="创建一个新的聊天"
          placement="top"
          onClick={() => setOpen(true)}
          icon={<PlusIcon className="w-4 h-4 text-gray-500" />}
          text="创建聊天"
          className="mx-auto bg-gray-200 active:bg-gray-300"
        />
        {opened && (
          <ChatSettingModel opened={opened} onClose={() => setOpen(false)} />
        )}
      </div>
    </div>
  );
}
