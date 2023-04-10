import { PlusCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';

import { ContactList, ContactItem } from '@ai-chat/chat-ui';

import PrimarySidebar from '../../../components/PrimarySidebar';

import type { IContact } from '../../../models/contacts';
import { useContacts } from '../../../hooks/useContacts';
import { useAppDispatch } from '../../../store';
import { openAddAssistantsPopup } from '../../../store/app';

export default function ContactsAside() {
  const navigate = useNavigate();
  const { contactId } = useParams();

  const dispatch = useAppDispatch();
  const { items } = useContacts();

  const handleCreate = () => {
    dispatch(openAddAssistantsPopup());
  };

  const handleClick = (payload: IContact) => {
    navigate(`/contacts/${payload.id}`, { replace: true });
  };

  return (
    <PrimarySidebar className="flex flex-col">
      <div className="p-[14px]">
        <button
          className="flex items-center justify-center w-full py-2 select-none text-gray-600 hover:text-gray-500 bg-white hover:bg-gray-200 active:bg-gray-200"
          onClick={handleCreate}
        >
          <PlusCircleIcon className="w-5 h-5 mr-1"></PlusCircleIcon>
          <span className="text-sm">新增联系人</span>
        </button>
      </div>
      <ContactList>
        {items.map((item, index) => (
          <ContactItem
            index={index}
            active={contactId === item.id}
            payload={item}
            key={item.id}
            onClick={handleClick}
          />
        ))}
      </ContactList>

      {items.length === 0 && (
        <div className="ai-fcc w-full h-full">
          <div className="text-center text-sm text-gray-400 select-none">
            <UserGroupIcon className="w-16 h-16 mb-2" />
            <p>还没有联系人</p>
          </div>
        </div>
      )}
    </PrimarySidebar>
  );
}
