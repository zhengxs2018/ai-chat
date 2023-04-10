import { Placement } from 'tippy.js';

import Input from '../base/Input';
import FieldLabel from './FieldLabel';

export interface FieldInputProps {
  label: string;
  tooltip?: string;
  id?: string;
  type?: string;
  className?: string;
  value: string;
  placement?: Placement;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function FieldInput({
  id,
  label,
  value,
  className,
  readOnly,
  disabled,
  tooltip,
  placement,
  type = 'text',
  placeholder = '请输入内容',
  onChange,
}: FieldInputProps) {
  return (
    <div className={'flex flex-col space-y-2'}>
      <FieldLabel label={label} tooltip={tooltip} placement={placement} />
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
