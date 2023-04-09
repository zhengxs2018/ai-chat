import React from 'react';

import { formatDate } from '../utils';
import type { ContactContentProps, IContact } from '../interfaces';

import { ContactAvatar } from './ContactAvatar';

export type ContactItemProps = ContactContentProps & {
  extra?: React.ReactNode | ((props: ContactContentProps) => React.ReactNode);
  onClick: (
    payload: IContact,
    index: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

export function ContactItem({
  active,
  index,
  payload,
  extra,
  onClick,
}: ContactItemProps) {
  return (
    <div
      className={`contact ${active ? 'is-active' : ''}`}
      onClick={(e) => onClick(payload, index, e)}
    >
      <div className="flex items-start">
        <div className="ai-fcc h-[36px] min-w-[36px] max-w-[36px]">
          <ContactAvatar payload={payload}></ContactAvatar>
        </div>
        <div className="flex-1 pl-[14px]">
          <div className="ai-fcb w-full">
            <div className="contact-name">{payload.name}</div>
            {typeof extra === 'function'
              ? extra({ index, active, payload })
              : extra}
          </div>
          <div className="ai-fcb">
            <div className="contact-bio w-[126px] truncate">
              {payload.bio}
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
