import { PlusIcon } from '@heroicons/react/24/outline';
import TippyButton from '@/components/base/TippyButton';

export default function ChatEmptyView() {
  return (
    <div className="h-full w-full ai-fcc">
      <div className="text-center text-sm text-gray-400">
        <p>没有记录</p>
        <p className="mb-4">创建一个试试</p>

        <TippyButton
          tooltip="创建一个新的聊天"
          placement="top"
          icon={<PlusIcon className="w-4 h-4 text-gray-500" />}
          text="创建聊天"
          className="mx-auto bg-gray-200 active:bg-gray-300"
        />
      </div>
    </div>
  );
}
