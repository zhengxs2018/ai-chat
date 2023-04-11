import Textarea, { TextareaProps } from '../base/Textarea';
import FieldLabel, { FieldLabelProps } from './FieldLabel';

export type FieldTextAreaProps = TextareaProps &
  FieldLabelProps & {
    tooltip?: string;
    onChange: (value: string) => void;
  };

export default function FieldTextArea({
  label,
  tooltip,
  placement,
  className,
  onChange,
  ...props
}: FieldTextAreaProps) {
  return (
    <div className={`flex flex-col space-y-2  ${className}`}>
      <FieldLabel label={label} tooltip={tooltip} placement={placement} />
      <Textarea
        {...props}
        className={`h-9 ml-0.5 resize-none`}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
