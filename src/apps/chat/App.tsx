import { Outlet } from 'react-router-dom';

import Appbar from './components/Appbar';
import AddContactModel from './components/AddContactModel';
import UserProfileModel from './components/UserProfileModel';
import PreferencesModel from './components/PreferencesModel';

export default function App() {
  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="mx-auto max-w-[1440px] h-full md:min-h-[600px] lg:py-8 transition-all ease-out duration-200">
        <div className="flex h-full overflow-hidden bg-white md:border md:rounded-md">
          <Appbar />
          <Outlet />
        </div>
      </div>
      <AddContactModel />
      <UserProfileModel />
      <PreferencesModel />
    </div>
  );
}
