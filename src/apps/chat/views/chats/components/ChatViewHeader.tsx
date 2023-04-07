import { useChat } from '../../../hooks/useChat';

// import ChatSettingButton from './ChatSettingButton';

export default function ChatViewHeader() {
  const { data, setTitle } = useChat();

  return (
    <header
      className={`flex justify-between items-center min-h-[60px] h-[60px] px-[20px] bg-white border-b-[1px]`}
    >
      <input
        className="flex-1 px-4 focus:outline-none"
        type="text"
        maxLength={20}
        value={data.title}
        onChange={(e) => setTitle(e.target.value.trim())}
      />
      {/* <ChatSettingButton></ChatSettingButton> */}
    </header>
  );
}
