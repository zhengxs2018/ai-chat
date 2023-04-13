import { createHashRouter, Navigate } from 'react-router-dom';

import ErrorBoundary from '@/components/exceptions/ErrorBoundary';
import NotFound from '@/components/exceptions/NotFound';

import App from './App';

import EditNotes from './views/edit/EditNotes';
import EditNote from './views/edit/EditNote';
import EditNoteEmpty from './views/edit/EditNoteEmpty';

export default createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/edit" replace />,
      },
      {
        path: 'edit',
        element: <EditNotes />,
        errorElement: <ErrorBoundary />,
        children: [
          { index: true, element: <EditNoteEmpty /> },
          {
            path: ':noteId',
            element: <EditNote />,
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
