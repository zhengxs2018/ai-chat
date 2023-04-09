import { PlusCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';

import { ContactList, ContactItem } from '@ai-chat/chat-ui';

import PrimarySidebar from '../../../components/PrimarySidebar';

import { IContact } from '../../../models';
import { useContacts } from '../../../hooks';

export default function ContactsAside() {
  const navigate = useNavigate();
  const { contactId } = useParams();

  const contacts = useContacts();

  const handleCreate = () => {
    const contact = contacts.create({
      avatar: '',
      name: '张三',
      bio: '比较常见的路人甲',
      hobbies: '',
      relationship: '朋友',
      hint: '小周',
      prompt: '',
    });

    navigate(`/contacts/${contact.id}`);
  };

  const handleClick = (payload: IContact) => {
    navigate(`/contacts/${payload.id}`);
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

      {contacts.items.length > 0 ? (
        <ContactList>
          {contacts.items.map((item, index) => (
            <ContactItem
              index={index}
              active={contactId === item.id}
              payload={item}
              key={item.id}
              onClick={handleClick}
            />
          ))}
        </ContactList>
      ) : (
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
