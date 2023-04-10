import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

import { FakeClientProvider } from '@ai-chat/fake-db';

import 'tippy.js/dist/tippy.css';
import '@ai-chat/chat-ui/style/index.css';

import './index.css';

import db from './models';
import store from './store';
import router from './router';

export default function Chat() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <FakeClientProvider value={db}>
          <Toaster />
          <RouterProvider router={router} />
        </FakeClientProvider>
      </Provider>
    </React.StrictMode>
  );
}
