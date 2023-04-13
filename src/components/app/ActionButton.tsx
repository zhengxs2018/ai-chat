import type { PropsWithChildren } from 'react';
import Tippy from '@tippyjs/react';
import classNames from 'classnames';

export type ActionButtonProps = PropsWithChildren & {
  text?: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
  onClickOutside?: () => void;
};

export default function ActionButton({
  text,
  children,
  active,
  className,
  onClick,
  onClickOutside,
}: ActionButtonProps) {
  return (
    <Tippy
      content={text}
      placement={'right'}
      duration={0}
      hideOnClick={true}
      trigger={'mouseenter'}
      onClickOutside={onClickOutside}
    >
      <button
        className={classNames(
          'ai-action-button flex items-center justify-center active:bg-light-300',
          {
            'text-indigo-600': active,
          },
          className
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </Tippy>
  );
}
