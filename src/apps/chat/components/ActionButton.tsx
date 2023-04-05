import Tippy from '@tippyjs/react';

export type ActionButtonProps = {
  text: string;
  active?: boolean;
  icon?: JSX.Element | ((active: boolean) => JSX.Element);
  onClick?: () => void;
  onClickOutside?: () => void;
};

export default function ActionButton({
  text,
  icon,
  active,
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
        className={`ai-action-button flex items-center justify-center active:bg-light-300 ${
          active && 'text-indigo-600'
        }`}
        onClick={onClick}
      >
        {typeof icon === 'function' ? icon(active) : icon}
      </button>
    </Tippy>
  );
}
