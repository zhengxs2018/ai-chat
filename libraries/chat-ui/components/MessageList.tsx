import React, { useEffect } from 'react';
import { Element, animateScroll } from 'react-scroll';

import type { IMessagePayload, MessageContentProps } from '../interfaces';

import { MessageItem } from './MessageItem';

export type MessageListProps = Pick<
  MessageContentProps,
  'onClick' | 'onContextMenu'
> & {
  className?: string;
  id?: string;
  messages: IMessagePayload[];
};

export function MessageList({
  id = 'messages',
  className = '',
  children,
  messages,
  ...props
}: React.PropsWithChildren<MessageListProps>) {
  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: id });
  }, [id, messages]);

  return (
    <Element
      id={id}
      name="messages"
      className={`w-full min-h-0 overflow-x-hidden overflow-y-auto ${className}`}
    >
      {messages.map((payload, index) => (
        <MessageItem
          {...props}
          key={payload.id}
          index={index}
          payload={payload}
        >
          {children}
        </MessageItem>
      ))}
    </Element>
  );
}
