import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import 'tippy.js/dist/tippy.css';
import './index.css';

import router from './router';

export default function Chat() {
  return (
    <React.StrictMode>
      <div className="w-screen h-screen bg-gray-100">
        <Toaster />
        <RouterProvider router={router} />
      </div>
    </React.StrictMode>
  );
}
