import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

export type ActivitybarProps = PropsWithChildren<{
  className?: string;
}>;

export default function Activitybar({ className, children }: ActivitybarProps) {
  return (
    <div
      className={clsx(
        'ai-activitybar flex-col h-full hidden md:flex',
        className
      )}
    >
      {children}
    </div>
  );
}
