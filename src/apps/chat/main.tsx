import React from 'react';
import { Toaster } from 'react-hot-toast';
import 'tippy.js/dist/tippy.css';

import App from './App';
import {
  CompletionContext,
  useCompletionProvider,
} from './hooks/useCompletionProvider';
import './index.css';

export default function ChatApp() {
  const complete = useCompletionProvider();

  return (
    <React.StrictMode>
      <Toaster />
      <CompletionContext.Provider value={complete}>
        <App />
      </CompletionContext.Provider>
    </React.StrictMode>
  );
}
