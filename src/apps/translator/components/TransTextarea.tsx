import classNames from 'classnames';
import { isMobile } from 'react-device-detect';

export type TransTextareaProps = {
  className?: string;
  value: string;
  rows?: number;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
};

export default function TransTextarea({
  value,
  className,
  rows,
  disabled,
  onChange,
  onSubmit,
}: TransTextareaProps) {
  const handleKeyup = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !isMobile) {
      e.stopPropagation();
      e.preventDefault();

      const value = (e.target as HTMLTextAreaElement).value.trim();

      if (e.shiftKey) {
        onChange(value + '\n');
        return;
      }

      if (value) onSubmit(value);
    }
  };

  return (
    <textarea
      className={classNames(
        'w-full p-4 text-xs md:text-sm text-gray-600 rounded-md border border-white bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none',
        className
      )}
      value={value}
      rows={rows}
      disabled={disabled}
      placeholder="输入要翻译的内容"
      onChange={(e) => onChange(e.target.value)}
      onKeyUp={handleKeyup}
    />
  );
}
