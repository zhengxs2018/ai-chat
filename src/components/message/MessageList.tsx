import React, { useEffect } from 'react';
import { Element, animateScroll } from 'react-scroll';

import MessageItem from './MessageItem';

import { IMessagePayload } from './interfaces';

export type MessageListProps = React.PropsWithChildren<{
  className?: string;
  id?: string;
  messages: IMessagePayload[];
}>;

function MessageList({
  id = 'messages',
  className = '',
  children,
  messages,
}: MessageListProps) {
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
        <MessageItem key={payload.id} index={index} payload={payload}>
          {children}
        </MessageItem>
      ))}
    </Element>
  );
}

export default MessageList;
