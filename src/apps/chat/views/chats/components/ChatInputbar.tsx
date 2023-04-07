import { CloudArrowDownIcon, TrashIcon } from '@heroicons/react/24/outline';
import Toast from 'react-hot-toast';

import TippyButton from '@/components/base/TippyButton';
import MessageInputbar from '@/components/message/MessageInputbar';

import { saveMarkdownToFile } from '@/shared/client/file';

import { useChat } from '../../../hooks/useChat';

export default function ChatInputbar() {
  const { data, sending, send, clearMessages } = useChat();

  const handleSend = async (value: string) => {
    try {
      await send(value);
    } catch (ex) {
      Toast.error(ex.message);
    }
  };

  return (
    <MessageInputbar loading={sending} onSend={handleSend}>
      <TippyButton
        tooltip="导出"
        placement="top"
        icon={<CloudArrowDownIcon className="w-6 h-6 text-gray-500" />}
        className="mr-4 hover:bg-gray-200 active:bg-gray-300"
        onClick={() => saveMarkdownToFile(data.title, data.messages)}
      />
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
