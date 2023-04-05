import ChatViewSidebar from './ChatViewSidebar';
import ChatMessageWindow from './ChatMessageWindow';

export default function ChatView() {
  return (
    <div className="flex-1 flex items-stretch w-full h-full overflow-hidden border border-gray-200 md:rounded-md">
      <ChatViewSidebar></ChatViewSidebar>
      <ChatMessageWindow></ChatMessageWindow>
    </div>
  );
}
