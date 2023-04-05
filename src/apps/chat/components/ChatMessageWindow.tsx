import ChatViewHeader from './ChatViewHeader';
import ChatMessageList from './ChatMessageList';
import ChatInputbar from './ChatInputbar';

export default function ChatMessageWindow() {
  return (
    <div className="flex flex-col items-stretch w-full min-h-0 bg-gray-100">
      <ChatViewHeader></ChatViewHeader>
      <ChatMessageList></ChatMessageList>
      <ChatInputbar></ChatInputbar>
    </div>
  );
}
