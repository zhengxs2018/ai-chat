import React from 'react';
import { Element } from 'react-scroll';

export type ContactListProps = React.PropsWithChildren<{
  className?: string;
}>;

export function ContactList({ className = '', children }: ContactListProps) {
  return (
    <Element
      name="contacts"
      className={`w-full min-h-0 overflow-x-hidden overflow-y-auto ${className}`}
    >
      {children}
    </Element>
  );
}
