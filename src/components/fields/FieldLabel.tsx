import Tippy from '@tippyjs/react';
import { Placement } from 'tippy.js';

import HelpIcon from '../icons/HelpIcon';

export interface FieldLabelProps {
  label: string;
  placement?: Placement;
  tooltip?: string;
}

export default function FieldLabel({
  label,
  tooltip,
  placement = 'bottom',
}: FieldLabelProps) {
  return (
    <div className="text-left text-gray-600 font flex flex-row items-center">
      {label}
      {tooltip && (
        <div className="ml-1.5">
          <Tippy
            content={tooltip}
            placement={placement}
            duration={0}
            hideOnClick={true}
            trigger={'mouseenter'}
          >
            <div>
              <HelpIcon className="w-4 h-4 mt-0.5 text-gray-400" />
            </div>
          </Tippy>
        </div>
      )}
    </div>
  );
}
