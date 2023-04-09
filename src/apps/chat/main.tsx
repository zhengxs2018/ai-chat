import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { FakeClientProvider } from '@ai-chat/fake-db';

import 'tippy.js/dist/tippy.css';
import '@ai-chat/chat-ui/style/index.css';

import './index.css';

import db from './models';
import router from './router';

export default function Chat() {
  return (
    <React.StrictMode>
      <FakeClientProvider value={db}>
        <Toaster />
        <RouterProvider router={router} />
      </FakeClientProvider>
    </React.StrictMode>
  );
}
