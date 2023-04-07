import React from 'react';
import { Toaster } from 'react-hot-toast';
import 'tippy.js/dist/tippy.css';

import App from './App';
import { ChatContext, useChatProvider } from './hooks/useChatProvider';

export default function ChatApp() {
  const chat = useChatProvider();

  return (
    <React.StrictMode>
      <ChatContext.Provider value={chat}>
        <Toaster />
        <App />
      </ChatContext.Provider>
    </React.StrictMode>
  );
}
