import {
  TrashIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ContactList, ContactItem } from '@ai-chat/chat-ui';

import PrimarySidebar from '../../../components/PrimarySidebar';

import { IContact } from '../../../models';
import { useContacts, useChats } from '../../../hooks';

export default function ChatsAside() {
  const navigate = useNavigate();
  const { chatId } = useParams();

  const { items, remove } = useChats();
  const { get } = useContacts();

  const chats = useMemo(() => {
    return items.map((item) => {
      const contact = get(item.talker_id);

      return {
        ...contact,
        ...item,
      };
    });
  }, [items, get]);

  const handleClick = (payload: IContact) => {
    navigate(`/chats/${payload.id}`);
  };

  const handleTrashClick = () => {
    remove(chatId);
    navigate('/chats');
  };

  return (
    <PrimarySidebar className="flex flex-col">
      <ContactList>
        {chats.map((item, index) => (
          <ContactItem
            index={index}
            active={chatId === item.id}
            payload={item}
            extra={
              <button
                className={`font-bold p-1 rounded-md hover:bg-gray-200 active:bg-gray-300`}
                onClick={handleTrashClick}
              >
                <TrashIcon className="w-[12px] h-[12px] text-gray-500" />
              </button>
            }
            key={item.id}
            onClick={handleClick}
          />
        ))}
      </ContactList>

      {chats.length === 0 && (
        <div className="ai-fcc w-full h-full">
          <div className="text-center text-sm text-gray-400 select-none">
            <ChatBubbleLeftRightIcon className="w-16 h-16 mb-2" />
            <p>还没有联系人</p>
          </div>
        </div>
      )}
    </PrimarySidebar>
  );
}
