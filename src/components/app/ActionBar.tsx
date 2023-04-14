import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

export type ActionBarProps = PropsWithChildren<{
  className?: string;
}>;

export default function ActionBar({ className, children }: ActionBarProps) {
  return (
    <div className={clsx('flex flex-col', className)}>{children}</div>
  );
}
