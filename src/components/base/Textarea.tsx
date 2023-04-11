import { useState, KeyboardEventHandler } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export type TextareaProps = {
  value?: string;
  placeholder?: string;
  rows?: number;
  maxRows?: number;
  minLength?: number;
  maxLength?: number;
  className?: string;
  readOnly?: boolean;
  disabled?: boolean;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function Textarea({
  value,
  placeholder,
  rows,
  maxRows,
  minLength,
  maxLength,
  className,
  readOnly,
  disabled,
  onChange,
  onKeyDown,
}: TextareaProps) {
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <TextareaAutosize
      className={`focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 border-2 shadow-sm block text-base text-gray-700 py-1 px-3 border-gray-200 rounded-md ${className}`}
      value={inputValue}
      minLength={minLength}
      maxLength={maxLength}
      placeholder={placeholder}
      minRows={rows}
      maxRows={maxRows}
      readOnly={readOnly}
      disabled={disabled}
      onChange={handleChange}
      onKeyDown={onKeyDown}
    />
  );
}
