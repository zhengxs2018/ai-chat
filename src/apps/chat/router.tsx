import { createHashRouter, Navigate } from 'react-router-dom';

import ErrorBoundary from '@/components/exceptions/ErrorBoundary';
import NotFound from '@/components/exceptions/NotFound';

import App from './App';

import Chats from './views/chats/Chats';
import Chat from './views/chats/Chat';
import ChatEmpty from './views/chats/ChatEmpty';
import Contacts from './views/contacts/Contacts';
import Contact from './views/contacts/Contact';
import ContactEmpty from './views/contacts/ContactEmpty';

export default createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/chats" replace />,
      },
      {
        path: 'chats',
        element: <Chats />,
        errorElement: <ErrorBoundary />,
        children: [
          { index: true, element: <ChatEmpty /> },
          {
            path: ':chatId',
            element: <Chat />,
            errorElement: <ErrorBoundary />,
          },
        ],
      },
      {
        path: 'contacts',
        element: <Contacts />,
        errorElement: <ErrorBoundary />,
        children: [
          { index: true, element: <ContactEmpty /> },
          {
            path: ':contactId',
            element: <Contact />,
            errorElement: <ErrorBoundary />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
