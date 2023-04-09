import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { useContacts } from '../../../hooks';

export type ContactsAsideProps = {
  className?: string;
};

export default function ContactsAside({ className }: ContactsAsideProps) {
  const contacts = useContacts();
  const navigate = useNavigate();

  const handleCreate = () => {
    const contact = contacts.create({
      name: '张三',
    });

    navigate(`/contacts/${contact.id}`);
  };

  return (
    <div className={classNames('flex flex-col', className)}>
      <div>
        <h2>Chats</h2>
        <button onClick={handleCreate}>新增</button>
      </div>
      <div>
        <ul>
          {contacts.items.map((contact) => (
            <li key={contact.id}>
              <Link to={`/contacts/${contact.id}`}>{contact.id}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
