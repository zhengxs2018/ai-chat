import React from 'react';
import { Toaster } from 'react-hot-toast';
import 'tippy.js/dist/tippy.css';

import App from './App';

import {
  CompletionContext,
  useCompletionProvider,
} from './hooks/useCompletionProvider';

export default function Note() {
  const complete = useCompletionProvider();

  return (
    <React.StrictMode>
      <CompletionContext.Provider value={complete}>
        <Toaster />
        <App />
      </CompletionContext.Provider>
    </React.StrictMode>
  );
}
