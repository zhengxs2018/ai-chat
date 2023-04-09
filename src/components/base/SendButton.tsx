import classNames from 'classnames';

import SendIcon from '@/components/icons/SendIcon';
import WaitingIcon from '@/components/icons/WaitingIcon';

export interface MessageInputSendButtonProps {
  text?: string;
  loading: boolean;
  className?: string;
  onClick?: () => void;
}

function MessageInputSendButton({
  text = '发送',
  loading,
  className,
  onClick,
}: MessageInputSendButtonProps) {
  const base =
    'flex flex-row items-center space-x-2 px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-tr from-indigo-500 to-purple-500 transition-colors duration-300';
  if (loading) {
    return (
      <button
        type="button"
        disabled
        className={classNames(base, 'cursor-wait', className)}
      >
        <WaitingIcon className="h-5 w-5 animate-spin" />
        <span>等待</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={classNames(
        base,
        ' hover:from-indigo-600 hover:to-purple-600 ',
        className
      )}
      onClick={onClick}
    >
      <SendIcon className="h-5 w-5" />
      <span>{text}</span>
    </button>
  );
}

export default MessageInputSendButton;
