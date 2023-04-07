import { useState, useMemo, useEffect } from 'react';

import { PlusCircleIcon } from '@heroicons/react/24/outline';

import ConcatList from '@/components/message/ContactList';
import type { IContact } from '@/components/message/interfaces';
import PrimarySidebar from '@/components/app/PrimarySidebar';

import { useChatService } from '../hooks/useChatService';
import ChatItemActions from './ChatItemActions';
import ChatViewSideEmpty from './ChatViewSideEmpty';

export default function ChatViewSidebar() {
  const [currentId, setCurrentId] = useState('');
  const { data, cursor, assistant, create } = useChatService();

  const contacts = useMemo(
    (): IContact[] =>
      data.map((item) => ({
        id: item.id,
        name: item.assistant ? item.assistant.name : assistant.name,
        role: 'assistant',
        desc: item.title,
        date: item.date,
      })),
    [data, assistant.name]
  );

  useEffect(() => {
    const current = data[cursor.index];
    if (current) {
      setCurrentId(current.id);
    } else {
      setCurrentId(null);
    }
  }, [data, cursor.index]);

  return (
    <PrimarySidebar>
      <div className="p-[14px] border-b-[1px] border-gray-200">
        <button
          className="flex items-center justify-center w-full py-2 bg-white active:bg-gray-200"
          onClick={create}
        >
          <PlusCircleIcon className="w-5 h-5 mr-1"></PlusCircleIcon>
          <span className="text-sm">新建聊天</span>
        </button>
      </div>
      <div className="flex-1 flex justify-stretch min-h-0 w-full relative bg-gray-100">
        {contacts.length > 0 ? (
          <ConcatList
            className="bg-gray-200"
            current={currentId}
            contacts={contacts}
            itemExtra={ChatItemActions}
            onClick={cursor.set}
          />
        ) : (
          <ChatViewSideEmpty />
        )}
      </div>
    </PrimarySidebar>
  );
}
