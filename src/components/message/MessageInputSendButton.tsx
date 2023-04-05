import SendIcon from '@/components/icons/SendIcon';
import WaitingIcon from '@/components/icons/WaitingIcon';

export interface MessageInputSendButtonProps {
  loading: boolean;
  onClick?: () => void;
}

function MessageInputSendButton({
  loading,
  onClick,
}: MessageInputSendButtonProps) {
  if (loading) {
    return (
      <button
        type="button"
        disabled
        className="flex flex-row items-center space-x-2 cursor-wait rounded-lg px-4 py-2 font-medium text-white bg-gradient-to-tr from-indigo-500 to-purple-500 transition-colors duration-300"
      >
        <WaitingIcon className="h-5 w-5 animate-spin" />
        <div>等待</div>
      </button>
    );
  }

  return (
    <button
      type="button"
      className="flex flex-row items-center space-x-2 rounded-lg px-4 py-2 font-medium text-white bg-gradient-to-tr from-indigo-500 to-purple-500 hover:bg-green-600 hover:from-indigo-600 hover:to-purple-600 transition-colors duration-300"
      onClick={onClick}
    >
      <SendIcon className="h-5 w-5" />
      <div>发送</div>
    </button>
  );
}

export default MessageInputSendButton;
