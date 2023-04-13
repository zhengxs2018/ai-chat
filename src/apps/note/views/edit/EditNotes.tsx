import { Outlet } from 'react-router-dom';

import EditNotesAside from './components/EditNotesAside';

export default function EditNotes() {
  return (
    <div className="flex w-full h-full overflow-hidden">
      <EditNotesAside />
      <Outlet />
    </div>
  );
}
