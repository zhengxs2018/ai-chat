import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';

import SendButton from '@/components/base/SendButton';

import { useCompletion } from '../hooks/useCompletion';

export default function CompletionEditor() {
  // 使用本地变量，防止频繁触发本地同步
  const [inputValue, setInputValue] = useState('');
  const { data, sending, complete } = useCompletion();

  const handleSend = async () => {
    const newContent = await complete(inputValue);
    setInputValue(`${inputValue}\n${newContent}`);
  };

  useEffect(() => {
    setInputValue(data.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.id]);

  return (
    <div className="flex-1 flex flex-col w-full py-6">
      <div className="flex-1 flex flex-col h-full p-2">
        <div className="min-h-[60px]">
          <input type="text" value={data.title} />
        </div>
        <div className="flex-1">
          <MDEditor
            value={inputValue}
            placeholder="为冰淇淋店写一个标语"
            highlightEnable={false}
            height={'100%'}
            onChange={setInputValue}
          />
        </div>
      </div>
      <div className="px-2">
        <SendButton loading={sending} onClick={handleSend} />
      </div>
    </div>
  );
}
