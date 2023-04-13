import type { PropsWithChildren } from 'react';
import classNames from 'classnames';

export type ActivitybarProps = PropsWithChildren<{
  className?: string;
}>;

export default function Activitybar({ className, children }: ActivitybarProps) {
  return (
    <div
      className={classNames(
        'ai-activitybar flex-col h-full hidden md:flex',
        className
      )}
    >
      {children}
    </div>
  );
}
