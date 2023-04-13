import React from 'react';
import { Toaster } from 'react-hot-toast';

import App from './App';
import './index.css';

export default function Translator() {
  return (
    <React.StrictMode>
      <Toaster />
      <div className="w-screen h-screen bg-gray-100 md:p-4">
        <App />
      </div>
    </React.StrictMode>
  );
}
