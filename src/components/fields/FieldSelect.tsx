import { Placement } from 'tippy.js';

import Select from '../base/Select';
import FieldLabel from './FieldLabel';

interface FieldSelectProps {
  text: string;
  helpText?: string;
  helpPlacement?: Placement;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  selectClassName?: string;
}

export default function FieldSelect({
  text,
  helpText,
  options,
  value,
  helpPlacement,
  onChange,
  className = '',
  selectClassName = '',
}: FieldSelectProps) {
  return (
    <div className={`flex flex-col items-start space-y-2 ${className}`}>
      <FieldLabel
        text={text}
        helpText={helpText}
        helpPlacement={helpPlacement}
      />
      <Select
        options={options}
        value={value}
        onChange={onChange}
        className={selectClassName}
      />
    </div>
  );
}
