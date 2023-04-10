import { Placement } from 'tippy.js';

import Textarea from '../base/Textarea';
import FieldLabel from './FieldLabel';

interface FieldTextAreaProps {
  label: string;
  tooltip?: string;
  placement?: Placement;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  maxRows?: number;
}

export default function FieldTextArea({
  label,
  tooltip,
  placement,
  value,
  onChange,
  className,
  placeholder,
  disabled,
  readOnly,
  rows,
  maxRows,
}: FieldTextAreaProps) {
  return (
    <div className={'flex flex-col space-y-2'}>
      <FieldLabel label={label} tooltip={tooltip} placement={placement} />
      <Textarea
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        className={`h-9 ml-0.5 resize-none ${className}`}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxRows={maxRows}
      />
    </div>
  );
}
