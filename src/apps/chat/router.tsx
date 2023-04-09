import { createHashRouter } from 'react-router-dom';

import App from './App';
import ErrorBoundary from './views/exceptions/ErrorBoundary';

import Chats from './views/chats/Chats';
import Chat from './views/chats/Chat';
import ChatEmpty from './views/chats/ChatEmpty';
import Contacts from './views/contacts/Contacts';

export default createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: 'chats',
        element: <Chats />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            index: true,
            element: <ChatEmpty />,
            errorElement: <ErrorBoundary />,
          },
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
      },
    ],
  },
]);
