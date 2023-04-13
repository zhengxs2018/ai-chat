import React from 'react';
import classNames from 'classnames';

export type NoteListProps = React.PropsWithChildren<{
  className?: string;
}>;

export default function NoteList({ className, children }: NoteListProps) {
  return (
    <div
      className={classNames(
        'w-full min-h-0 overflow-x-hidden overflow-y-auto',
        className
      )}
    >
      {children}
    </div>
  );
}
