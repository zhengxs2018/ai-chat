export type InputProps = {
  id?: string;
  type?: string;
  className?: string;
  value: string;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step?: string | number;
};

export default function Input({
  id,
  value,
  step,
  className,
  type = 'text',
  placeholder = '请输入内容',
  readOnly,
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
      onChange={onChange}
      step={step}
      spellCheck={false}
    ></input>
  );
}
