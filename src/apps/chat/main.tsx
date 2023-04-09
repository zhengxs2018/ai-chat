import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import 'tippy.js/dist/tippy.css';
import db from './models';

import './index.css';

import ChatsProvider from './components/ChatsProvider';
import ContactsProvider from './components/ContactsProvider';
import MessagesProvider from './components/MessagesProvider';

import router from './router';

export default function Chat() {
  db.connect();

  return (
    <React.StrictMode>
      <ContactsProvider>
        <MessagesProvider>
          <ChatsProvider>
            <div className="w-screen h-screen bg-gray-100">
              <Toaster />
              <RouterProvider router={router} />
            </div>
          </ChatsProvider>
        </MessagesProvider>
      </ContactsProvider>
    </React.StrictMode>
  );
}
