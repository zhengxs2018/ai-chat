import { useChat } from './hooks/useChat';

import ChatViewSidebar from './components/ChatViewSidebar';
import ChatViewHeader from './components/ChatViewHeader';
import ChatMessageList from './components/ChatMessageList';
import ChatInputbar from './components/ChatInputbar';
import ChatViewEmpty from './components/ChatViewEmpty';

export default function App() {
  const { data } = useChat();

  return (
    <div className="flex-1 flex items-stretch w-full h-full overflow-hidden">
      <ChatViewSidebar></ChatViewSidebar>
      {data ? (
        <div className="flex flex-col items-stretch w-full min-h-0 bg-gray-100">
          <ChatViewHeader></ChatViewHeader>
          <ChatMessageList></ChatMessageList>
          <ChatInputbar></ChatInputbar>
        </div>
      ) : (
        <ChatViewEmpty></ChatViewEmpty>
      )}
    </div>
  );
}
