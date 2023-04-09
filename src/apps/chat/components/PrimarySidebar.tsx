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
        'ai-primary-sidebar h-full bg-gray-100 border-r-[1px] hidden md:flex md:flex-col',
        className
      )}
    >
      {children}
    </div>
  );
}
