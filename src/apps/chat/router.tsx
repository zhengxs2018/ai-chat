import { createHashRouter } from 'react-router-dom';

import App from './App';

import ChatsView from './views/chats/ChatsView';
import ChatView from './views/chats/ChatView';
import ChatIndexView from './views/chats/ChatIndexView';

import NotesView from './views/notes/NotesView';
import ErrorView from './views/exceptions/ErrorView';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorView />,
    children: [
      {
        path: 'chats',
        element: <ChatsView />,
        errorElement: <ErrorView />,
        children: [
          {
            index: true,
            element: <ChatIndexView />,
          },
          {
            path: ':chatId',
            element: <ChatView />,
          },
        ],
      },
      {
        path: 'notes',
        element: <NotesView />,
        errorElement: <ErrorView />,
      },
    ],
  },
]);

export default router;
