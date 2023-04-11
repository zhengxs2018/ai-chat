export type InputProps = {
  id?: string;
  type?: string;
  className?: string;
  value: number | string;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  step?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  id,
  value,
  step,
  className,
  type = 'text',
  placeholder = '请输入内容',
  readOnly,
  maxLength,
  disabled,
  onChange,
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      className={`focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-base text-gray-700 py-1 ${
        type === 'number' ? 'pl-3 pr-1' : 'px-3'
      } border-2 shadow-sm block border-gray-200 rounded-md ${className}`}
      value={value}
      readOnly={readOnly}
      disabled={disabled}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={onChange}
      step={step}
      spellCheck={false}
    ></input>
  );
}
