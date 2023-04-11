import classNames from 'classnames';
import { useState } from 'react';

export type SearchInputProps = {
  className?: string;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onSearch: (searchString: string) => void;
  onClear: () => void;
};

export default function SearchInput({
  className,
  placeholder = '搜索',
  readOnly,
  disabled,
  onSearch,
  onClear,
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();

      const searchString = inputValue.trim();
      if (searchString) {
        onSearch(searchString);
      } else {
        onClear();
      }
    }
  };

  return (
    <input
      type="search"
      className={classNames(
        'w-full h-[30px] py-1 px-3 rounded-md',
        'text-xs text-gray-700 bg-[#eaeaea]',
        'focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500',
        className
      )}
      value={inputValue}
      readOnly={readOnly}
      disabled={disabled}
      placeholder={placeholder}
      spellCheck={false}
      onChange={(e) => setInputValue(e.target.value.trim())}
      onKeyUp={handleKeyup}
    ></input>
  );
}
