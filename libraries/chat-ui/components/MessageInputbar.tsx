import { useState, useRef, useEffect, PropsWithChildren } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { MessageSendButton } from './MessageSendButton';

export type MessageInputbarProps = PropsWithChildren<{
  loading: boolean;
  onSend: (value: string) => void;
}>;

export function MessageInputbar({ loading, children, onSend }: MessageInputbarProps) {
  const [userInput, setUserInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>();

  const handleSend = () => {
    const content = userInput.trim();
    if (!content) return;

    onSend(content);
    setUserInput('');
  };

  const handleInputKeyDown: React.KeyboardEventHandler<
    HTMLTextAreaElement
  > = async (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();

      if (event.shiftKey) {
        event.preventDefault();
        setUserInput(`${userInput}\n`);
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setUserInput(event.target.value);
        handleSend();
      }
    }
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <div className="px-[18px] py-[16px] border-t-[1px] bg-white">
      <TextareaAutosize
        className="bg-gray-200 rounded-lg px-4 py-2 w-full border-none focus:ring-0 focus:outline-none resize-none"
        value={userInput}
        maxRows={5}
        placeholder="请输入消息"
        ref={inputRef}
        onChange={(event) => setUserInput(event.target.value)}
        onKeyDown={handleInputKeyDown}
      />
      <div className="flex justify-between mt-2">
        <div className="flex justify-start items-center">{children}</div>
        <div className="flex justify-end items-center">
          <div className="mr-2 text-sm text-gray-400">⏎ 发送 / ⌘⏎ 换行</div>
          <MessageSendButton
           loading={loading} onClick={handleSend} />
        </div>
      </div>
    </div>
  );
}
