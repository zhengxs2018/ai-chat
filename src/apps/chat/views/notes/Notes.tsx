import { Outlet } from 'react-router-dom';

import NotesAside from './components/NotesAside';

export default function Notes() {
  return (
    <div className="flex w-full h-full overflow-hidden">
      <NotesAside />
      <Outlet />
    </div>
  );
}
