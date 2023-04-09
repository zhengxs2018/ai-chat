import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { ContactList, ContactItem } from '@ai-chat/chat-ui';

import PrimarySidebar from '../../../components/PrimarySidebar';

import { IContact } from '../../../models';
import { useContacts } from '../../../hooks';

export type ContactsAsideProps = {
  className?: string;
};

export default function ContactsAside({ className }: ContactsAsideProps) {
  const navigate = useNavigate();
  const { contactId } = useParams();

  const contacts = useContacts();

  const handleCreate = () => {
    const contact = contacts.create({
      avatar: '',
      name: '张三',
      bio: '',
    });

    navigate(`/contacts/${contact.id}`);
  };

  const handleClick = (payload: IContact) => {
    navigate(`/contacts/${payload.id}`);
  };

  return (
    <PrimarySidebar className={classNames('flex flex-col', className)}>
      <div>
        <h2>通讯录</h2>
        <button onClick={handleCreate}>新增</button>
      </div>
      <div>
        <ContactList>
          {contacts.items.map((contact, index) => (
            <ContactItem
              index={index}
              active={contactId === contact.id}
              payload={contact}
              key={contact.id}
              onClick={handleClick}
            />
          ))}
        </ContactList>
      </div>
    </PrimarySidebar>
  );
}
