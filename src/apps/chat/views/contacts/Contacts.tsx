import { Outlet } from 'react-router-dom';

import ContactsAside from './components/ContactsAside';

export default function Contacts() {
  return (
    <div className="flex w-full h-full overflow-hidden">
      <ContactsAside />
      <Outlet />
    </div>
  );
}
