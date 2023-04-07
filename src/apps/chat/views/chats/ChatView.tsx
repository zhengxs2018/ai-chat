import ChatViewHeader from './components/ChatViewHeader';
import ChatMessageList from './components/ChatMessageList';
import ChatInputbar from './components/ChatInputbar';

export default function ChatView() {
  return (
    <div className="flex flex-col items-stretch w-full min-h-0 bg-gray-100">
      <ChatViewHeader></ChatViewHeader>
      <ChatMessageList></ChatMessageList>
      <ChatInputbar></ChatInputbar>
    </div>
  );
}
