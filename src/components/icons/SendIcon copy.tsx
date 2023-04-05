import React from 'react';
import classNames from 'classnames';

interface SendIconProps {
  className?: string;
  strokeWidth?: string;
}

const SendIcon: React.FC<SendIconProps> = ({ className, strokeWidth }) => (
  <svg
    className={classNames('', className)}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth || '2'}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <line x1="10" y1="14" x2="21" y2="3" />
    <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" />
  </svg>
);

export default SendIcon;
