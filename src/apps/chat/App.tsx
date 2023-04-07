import { Outlet } from 'react-router-dom';
import {
  ChatBubbleBottomCenterIcon,
  BookOpenIcon,
} from '@heroicons/react/24/solid';

import Activitybar from './components/Activitybar';
import ActivitybarUser from './components/ActivitybarUser';
import ActionLink from './components/ActionLink';

export default function App() {
  return (
    <div className="mx-auto max-w-[1440px] h-full md:min-h-[600px] lg:py-8 transition-all ease-out duration-200">
      <div className="flex h-full overflow-hidden bg-white md:border md:rounded-md">
        <Activitybar>
          <div className="ai-fcc mb-4">
            <ActivitybarUser />
          </div>
          <div className="flex-1 flex flex-col">
            <ActionLink text="聊天" to="/chats">
              <ChatBubbleBottomCenterIcon className="action-button-icon" />
            </ActionLink>
            <ActionLink text="笔记" to="/notes">
              <BookOpenIcon className="action-button-icon" />
            </ActionLink>
          </div>
        </Activitybar>
        <div className="flex-1 flex items-stretch w-full h-full overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
