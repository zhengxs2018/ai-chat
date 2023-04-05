import ChatSettingButton from './ChatSettingButton';

export default function ChatViewHeader() {
  return (
    <header
      className={`flex justify-between items-center min-h-[60px] h-[60px] px-[20px] bg-white border-b-[1px]`}
    >
      <div>聊天啦</div>
      <ChatSettingButton></ChatSettingButton>
    </header>
  );
}
