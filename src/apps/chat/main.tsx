import React from 'react';
import { Toaster } from 'react-hot-toast';
import 'tippy.js/dist/tippy.css';

import './index.css';
import App from './App';
import { ChatContext, useChatProvider } from './hooks/useChatProvider';
import {
  CompletionContext,
  useCompletionProvider,
} from './hooks/useCompletionProvider';

export default function ChatApp() {
  const chat = useChatProvider();
  const complete = useCompletionProvider();

  return (
    <React.StrictMode>
      <ChatContext.Provider value={chat}>
        <CompletionContext.Provider value={complete}>
          <Toaster />
          <App />
        </CompletionContext.Provider>
      </ChatContext.Provider>
    </React.StrictMode>
  );
}
