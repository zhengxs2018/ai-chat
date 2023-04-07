import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';

export type ActionLinkProps = PropsWithChildren<{
  className?: string;
  active?: boolean;
  text: string;
  to?: string;
  tooltip?: string;
}>;

export default function ActionLink({
  className,
  active,
  text,
  to,
  children,
}: ActionLinkProps) {
  return (
    <Tippy
      content={text}
      placement={'right'}
      duration={0}
      hideOnClick={true}
      trigger={'mouseenter'}
    >
      <Link
        className={`ai-action-link flex items-center justify-center active:bg-light-300 ${className} ${
          active && 'text-indigo-600'
        }`}
        to={to}
      >
        {children}
      </Link>
    </Tippy>
  );
}
