import ChatViewSidebar from './ChatViewSidebar';
import ChatMessageWindow from './ChatMessageWindow';
import ChatViewEmpty from './ChatViewEmpty';

export default function ChatView() {
  const flag = false;
  return (
    <div className="flex-1 flex items-stretch w-full h-full overflow-hidden">
      <ChatViewSidebar></ChatViewSidebar>
      {flag ? (
        <ChatMessageWindow></ChatMessageWindow>
      ) : (
        <ChatViewEmpty></ChatViewEmpty>
      )}
    </div>
  );
}
