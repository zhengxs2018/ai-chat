import { useChat } from '../hooks/useChat';

import ChatSettingButton from './ChatSettingButton';

export default function ChatViewHeader() {
  const { data } = useChat();

  return (
    <header
      className={`flex justify-between items-center min-h-[60px] h-[60px] px-[20px] bg-white border-b-[1px]`}
    >
      <div>{data.title}</div>
      <ChatSettingButton></ChatSettingButton>
    </header>
  );
}
