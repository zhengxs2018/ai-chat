import React from 'react';

import ContactAvatar from './ContactAvatar';
import { ContactContentProps, IContact } from './interfaces';

import './contact.css';
import { formatDate } from './utils';

export type ContactItemProps = {
  extra?: React.ReactNode | ((props: ContactContentProps) => React.ReactNode);
  current?: string;
  onClick: (
    index: number,
    payload: IContact,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
} & Omit<ContactContentProps, 'isActive'>;

function ContactItem({
  current,
  index,
  payload,
  extra,
  onClick,
}: ContactItemProps) {
  const isActive = current === payload.id;
  return (
    <div
      className={`contact ${isActive ? 'is-active' : ''}`}
      onClick={(e) => onClick(index, payload, e)}
    >
      <div className="flex items-start">
        <div className="ai-fcc h-[36px] min-w-[36px] max-w-[36px]">
          <ContactAvatar payload={payload}></ContactAvatar>
        </div>
        <div className="flex-1 pl-[14px]">
          <div className="ai-fcb w-full">
            <div className="contact-name">{payload.name}</div>
            {typeof extra === 'function'
              ? extra({ isActive, index, payload })
              : extra}
          </div>
          <div className="ai-fcb">
            <div className="contact-desc w-[126px] truncate">
              {payload.desc}
            </div>
            <div className="contact-date">
              {payload.date && formatDate(payload.date)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactItem;
