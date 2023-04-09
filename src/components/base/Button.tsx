import React from 'react';
import classNames from 'classnames';

export const styles = {
  base: 'flex items-center justify-center py-2 px-2 select-none',
  rounded: 'rounded-md',
  primary: 'text-white hover:text-gray-100 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700',
  default: 'text-gray-400 hover:text-gray-600 bg-gray-200 hover:text-gray-500 active:bg-gray-300',
};

export type ButtonProps = React.PropsWithChildren<{
  className?: string;
  type?: 'primary' | 'default';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}>;

export default function Button({
  className,
  type = 'default',
  size = 'sm',
  rounded = true,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={classNames(
        styles.base,
        styles[type || 'default'],
        `text-${size}`,
        {
          [styles.rounded]: rounded !== false,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
