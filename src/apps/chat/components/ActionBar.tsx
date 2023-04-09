import ActionButton, { ActionButtonProps } from './ActionButton';

export type ActionButton = ActionButtonProps & {
  key: string;
  icon?: React.ReactNode;
};

export type ActionBarProps = {
  active?: string;
  buttons: ActionButton[];
  onClick?: (button: ActionButton) => void;
};

export default function ActionBar({
  active,
  buttons,
  onClick,
}: ActionBarProps) {
  const handleClick = (button: ActionButton) => {
    onClick?.(button);
    button.onClick?.();
  };
  const handleClickOutside = (button: ActionButton) => {
    onClick?.(button);
    button.onClickOutside?.();
  };

  return (
    <div className="flex flex-col">
      {buttons.map((button) => (
        <ActionButton
          text={button.text}
          active={active === button.key}
          key={button.key}
          onClick={() => handleClick(button)}
          onClickOutside={() => handleClickOutside(button)}
        >
          {button.icon}
        </ActionButton>
      ))}
    </div>
  );
}
