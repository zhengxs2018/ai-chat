import Tippy from '@tippyjs/react';
import { Placement } from 'tippy.js';

import HelpIcon from '../icons/HelpIcon';

export interface FieldLabelProps {
  text: string;
  helpPlacement?: Placement;
  helpText?: string;
}

export default function FieldLabel({
  text,
  helpText,
  helpPlacement = 'bottom',
}: FieldLabelProps) {
  return (
    <div className="text-left text-gray-600 font flex flex-row items-center">
      {text}
      {helpText && (
        <div className="ml-1.5">
          <Tippy
            content={helpText}
            placement={helpPlacement}
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
