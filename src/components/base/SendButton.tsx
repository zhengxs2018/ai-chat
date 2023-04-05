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
        <div>等待</div>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={classNames(
        base,
        ' hover:bg-green-600 hover:from-indigo-600 hover:to-purple-600 ',
        className
      )}
      onClick={onClick}
    >
      <SendIcon className="h-5 w-5" />
      <div>{text}</div>
    </button>
  );
}

export default MessageInputSendButton;
