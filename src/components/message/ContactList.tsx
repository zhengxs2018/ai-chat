import { ReactNode } from 'react';
import { Element } from 'react-scroll';

import ContactItem from './ContactItem';
import { IContact, ContactContentProps } from './interfaces';

export type ContactListProps = {
  className?: string;
  current?: string;
  contacts: IContact[];
  itemExtra?: ReactNode | ((props: ContactContentProps) => ReactNode);
  onClick: (
    index: number,
    payload: IContact,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

export default function ContactList({
  className = '',
  current,
  contacts,
  itemExtra,
  onClick,
}: ContactListProps) {
  return (
    <Element
      name="contacts"
      className={`w-full min-h-0 overflow-x-hidden overflow-y-auto ${className}`}
    >
      {contacts.map((contact, index) => (
        <ContactItem
          key={contact.id}
          current={current}
          index={index}
          payload={contact}
          extra={itemExtra}
          onClick={onClick}
        />
      ))}
    </Element>
  );
}
