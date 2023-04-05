import { useState } from 'react';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';

import TippyButton from '@/components/base/TippyButton';
import Dialog from '@/components/base/Dialog';
import SettingTitle from '@/components/settings/SettingTitle';
import FieldInput from '@/components/fields/FieldInput';

export type CompletionSettingModelProps = {
  onConfirm?: (title: string) => void;
  onClose: () => void;
};

export default function CompletionSettingModel({
  onConfirm,
  onClose,
}: CompletionSettingModelProps) {
  const [title, setTitle] = useState('New Note!');

  return (
    <Dialog open={true} onClose={onClose}>
      <div className="absolute top-4 right-4 flex sm:right-6">
        <TippyButton
          tooltip="确定"
          onClick={() => onConfirm(title)}
          icon={<CheckIcon className="w-6 h-6 text-gray-500" />}
          className="hover:bg-gray-200 active:bg-gray-300"
        />
        <TippyButton
          tooltip="取消"
          onClick={onClose}
          icon={<XMarkIcon className="w-6 h-6 text-gray-500" />}
          className="hover:bg-gray-200 active:bg-gray-300"
        />
      </div>

      <div className="pb-5 flex flex-col space-y-2 overflow-y-scroll px-4 sm:py-6 sm:max-h-40 w-full max-h-[32rem]">
        <SettingTitle text="创建笔记" />
        <FieldInput
          text="标题"
          type="text"
          value={title}
          helpText="显示的消息标题"
          helpPlacement="right"
          placeholder=""
          onChange={(e) => setTitle(e)}
        />
      </div>
    </Dialog>
  );
}
