import { Outlet } from 'react-router-dom';

import ContactsAside from './components/ContactsAside';

export default function Contacts() {
  return (
    <div className="w-full h-full overflow-hidden">
      <ContactsAside />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
