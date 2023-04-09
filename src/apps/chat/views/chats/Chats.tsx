import { Outlet } from 'react-router-dom';

import ChatsAside from './components/ChatsAside';

export default function Chats() {
  return (
     <div className="flex w-full h-full overflow-hidden">
     <ChatsAside />
     <div className="flex-1">
       <Outlet />
     </div>
   </div>
  );
}
