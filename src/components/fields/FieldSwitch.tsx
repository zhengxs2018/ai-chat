import { Placement } from 'tippy.js';

import Toggle from '../base/Toggle';
import FieldLabel from './FieldLabel';

interface FieldSwitchProps {
  text: string;
  helpText?: string;
  checked: boolean;
  helpPlacement?: Placement;
  onChange: (checked: boolean) => void;
  className?: string;
}

export default function FieldSwitch({
  text,
  helpText,
  helpPlacement,
  checked,
  onChange,
  className,
}: FieldSwitchProps) {
  return (
    <div className="flex flex-row justify-between items-center">
      <FieldLabel
        text={text}
        helpText={helpText}
        helpPlacement={helpPlacement}
      />
      <Toggle checked={checked} onChange={onChange} className={className} />
    </div>
  );
}
