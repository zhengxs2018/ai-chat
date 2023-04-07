import { Outlet } from 'react-router-dom';

import { ChatContext, useChatProvider } from '../../hooks/useChatProvider';

import ChatViewSidebar from './components/ChatViewSidebar';

export default function ChatsView() {
  const provider = useChatProvider();

  return (
    <ChatContext.Provider value={provider}>
      <ChatViewSidebar></ChatViewSidebar>
      <Outlet />
    </ChatContext.Provider>
  );
}
