import { PlusCircleIcon } from '@heroicons/react/24/outline';

import ConcatList from '@/components/message/ContactList';

import PrimarySidebar from './PrimarySidebar';
import ChatViewSideEmpty from './ChatViewSideEmpty';

export default function ChatViewSidebar() {
  const contacts = [];

  const handleClick = () => {
    // pass
  };

  return (
    <PrimarySidebar>
      <div className="p-[14px]">
        <button className="flex items-center justify-center w-full py-2 bg-white active:bg-gray-200">
          <PlusCircleIcon className="w-5 h-5 mr-1"></PlusCircleIcon>
          <span className="text-sm">新建聊天</span>
        </button>
      </div>
      <div className="flex-1 flex justify-stretch min-h-0 w-full relative">
        {contacts.length === 0 && <ChatViewSideEmpty />}
        <ConcatList current={''} contacts={contacts} onClick={handleClick} />
      </div>
    </PrimarySidebar>
  );
}
