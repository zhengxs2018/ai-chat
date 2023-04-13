import type { PropsWithChildren } from 'react';
import classNames from 'classnames';

export type ActionBarProps = PropsWithChildren<{
  className?: string;
}>;

export default function ActionBar({ className, children }: ActionBarProps) {
  return (
    <div className={classNames('flex flex-col', className)}>{children}</div>
  );
}
