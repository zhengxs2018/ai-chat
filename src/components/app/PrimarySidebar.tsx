import classNames from 'classnames';
import React from 'react';

export type PrimarySidebarProps = React.PropsWithChildren<{
  className?: string;
}>;

export default function PrimarySidebar({
  className,
  children,
}: PrimarySidebarProps) {
  return (
    <div
      className={classNames(
        'ai-primary-sidebar flex-1 hidden flex-col h-full bg-gray-100 border-r-[1px]',
        'md:flex',
        className
      )}
    >
      <div className="flex flex-col h-full overflow-hidden">{children}</div>
    </div>
  );
}
