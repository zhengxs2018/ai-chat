import React from 'react';
import Tippy from '@tippyjs/react';
import type { Placement } from 'tippy.js';

export type TippyButtonProps = React.PropsWithChildren<{
  className?: string;
  tooltip?: string;
  placement?: Placement;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}>;

export default function TippyButton({
  className = '',
  children,
  tooltip = '',
  placement = 'bottom',
  disabled,
  onClick,
}: TippyButtonProps) {
  return (
    <Tippy
      content={tooltip}
      placement={placement || 'bottom'}
      duration={0}
      hideOnClick={true}
      trigger={'mouseenter'}
    >
      <button
        className={`py-2 px-2 rounded-md select-none ${className}`}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </Tippy>
  );
}
