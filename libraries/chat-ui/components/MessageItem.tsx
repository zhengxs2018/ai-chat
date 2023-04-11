import React from 'react';

import type { MessageContentProps } from '../interfaces';

import { MessageContent } from './MessageContent';
import { ContactAvatar } from './ContactAvatar';
import { MessageItemUser } from './MessageItemUser';

export type MessageItemProps = React.PropsWithChildren<MessageContentProps>;

export function MessageItem({ children, payload, ...props }: MessageItemProps) {
  const itself = payload.self;

  return (
    <div
      className={`p-[20px] flex items-start ${
        itself ? 'justify-end itself' : 'justify-start'
      }`}
    >
      <ContactAvatar payload={payload.talker}></ContactAvatar>
      <div
        className={`flex flex-col overflow-hidden ${
          itself ? 'order-first mr-2' : 'ml-2'
        }`}
      >
        <MessageItemUser payload={payload}></MessageItemUser>
        {renderMessageContent(children, { payload, ...props })}
      </div>
    </div>
  );
}

function renderMessageContent(
  children: React.ReactNode,
  props: MessageItemProps
) {
  if (children) {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, props);
      }

      return child;
    });
  }

  switch (props.payload.type) {
    default:
      return <MessageContent {...props} />;
  }
}
