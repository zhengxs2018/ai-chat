import { useState } from 'react';

import TippyButton from '@/components/base/TippyButton';
import SettingIcon from '@/components/icons/SettingIcon';

import ChatSettingModel from './ChatSettingModel';

export default function ChatSettingButton() {
  const [opened, setOpenState] = useState(false);

  const data = {
    // pass
  };

  const handleChange = (payload: { title: string }) => {
    setOpenState(false);
  };

  return (
    <>
      <TippyButton
        tooltip="聊天设置"
        placement="left"
        onClick={() => setOpenState(true)}
        icon={<SettingIcon className="w-6 h-6 text-gray-500" />}
        className="hover:bg-gray-200 active:bg-gray-300"
      />
      {opened && (
        <ChatSettingModel
          opened={opened}
          mode="edit"
          data={data}
          onConfirm={handleChange}
          onClose={() => setOpenState(false)}
        />
      )}
    </>
  );
}
