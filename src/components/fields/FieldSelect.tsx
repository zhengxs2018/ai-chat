import Select, { SelectProps } from '../base/Select';
import FieldLabel, { FieldLabelProps } from './FieldLabel';

export type FieldSelectProps = SelectProps &
  FieldLabelProps & {
    selectClassName?: string;
  };

export default function FieldSelect({
  label,
  tooltip,
  placement,
  className = '',
  selectClassName = '',
  ...props
}: FieldSelectProps) {
  return (
    <div className={`flex flex-col items-start space-y-2 ${className}`}>
      <FieldLabel label={label} tooltip={tooltip} placement={placement} />
      <Select {...props} className={selectClassName} />
    </div>
  );
}
