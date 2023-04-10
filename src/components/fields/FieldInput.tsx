import Input, { InputProps } from '../base/Input';
import FieldLabel, { FieldLabelProps } from './FieldLabel';

export type FieldInputProps = InputProps &
  FieldLabelProps & {
    className?: string;
    onChange: (value: string) => void;
  };

export default function FieldInput({
  label,
  tooltip,
  placement,
  className,
  onChange,
  ...props
}: FieldInputProps) {
  return (
    <div className={'flex flex-col space-y-2'}>
      <FieldLabel label={label} tooltip={tooltip} placement={placement} />
      <Input
        {...props}
        onChange={(e) => onChange(e.target.value)}
        className={`h-9 mx-0.5 ${className}`}
      />
    </div>
  );
}
