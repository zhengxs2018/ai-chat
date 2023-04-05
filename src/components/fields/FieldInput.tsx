import { Placement } from 'tippy.js';

import Input from '../base/Input';
import FieldLabel from './FieldLabel';

export interface FieldInputProps {
  text: string;
  helpText?: string;
  id?: string;
  type: string;
  className?: string;
  value: string;
  helpPlacement?: Placement;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder: string;
  onChange: (value: string) => void;
}

export default function FieldInput({
  text,
  helpText,
  id,
  type,
  className,
  value,
  readOnly,
  disabled,
  helpPlacement,
  placeholder,
  onChange,
}: FieldInputProps) {
  return (
    <div className={'flex flex-col space-y-2'}>
      <FieldLabel
        text={text}
        helpText={helpText}
        helpPlacement={helpPlacement}
      />
      <Input
        id={id}
        type={type}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`h-9 mx-0.5 ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
}
