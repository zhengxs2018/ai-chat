import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { FakeClientProvider } from '@ai-chat/fake-db';

import 'tippy.js/dist/tippy.css';
import '@/components/app/index.css';

import db from './models';
import router from './router';

export default function App() {
  return (
    <React.StrictMode>
      <FakeClientProvider value={db}>
        <Toaster />
        <div className="w-screen h-screen bg-gray-100">
          <RouterProvider router={router} />
        </div>
      </FakeClientProvider>
    </React.StrictMode>
  );
}
