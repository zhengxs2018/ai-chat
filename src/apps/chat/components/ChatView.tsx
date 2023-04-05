import { useChat } from '../hooks/useChat';

import ChatViewSidebar from './ChatViewSidebar';
import ChatViewHeader from './ChatViewHeader';
import ChatMessageList from './ChatMessageList';
import ChatInputbar from './ChatInputbar';
import ChatViewEmpty from './ChatViewEmpty';

export default function ChatView() {
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
