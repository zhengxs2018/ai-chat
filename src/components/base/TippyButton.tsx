import Tippy from '@tippyjs/react';
import type { Placement } from 'tippy.js';

interface TippyButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  text?: string;
  placement?: Placement;
  icon?: React.ReactNode;
  tooltip?: string;
}

function TippyButton(props: TippyButtonProps) {
  return (
    <>
      {props.tooltip && (
        <Tippy
          content={props.tooltip}
          placement={props.placement || 'bottom'}
          duration={0}
          hideOnClick={true}
          trigger={'mouseenter'}
        >
          <button
            className={`py-2 px-2 rounded-md ai-fcc ${props.className}`}
            onClick={props.onClick}
          >
            {props.icon}
            {props.text}
          </button>
        </Tippy>
      )}
      {!props.tooltip && (
        <button
          className={`py-2 px-2 rounded-md ai-fcc ${props.className}`}
          onClick={props.onClick}
        >
          {props.icon}
          {props.text}
        </button>
      )}
    </>
  );
}

export default TippyButton;
