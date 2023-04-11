import Toggle, { ToggleProps } from '../base/Toggle';
import FieldLabel, { FieldLabelProps } from './FieldLabel';

export type FieldSwitchProps = FieldLabelProps &
  ToggleProps & {
    className?: string;
  };

export default function FieldSwitch({
  label,
  tooltip,
  placement,
  ...props
}: FieldSwitchProps) {
  return (
    <div className="flex flex-row justify-between items-center">
      <FieldLabel label={label} tooltip={tooltip} placement={placement} />
      <Toggle {...props} />
    </div>
  );
}
