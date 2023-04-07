import { useRef, useEffect, useState } from 'react';
import Toast from 'react-hot-toast';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

import SendButton from '@/components/base/SendButton';

import { useCompletion } from '../../../hooks/useCompletion';

export default function CompletionEditor() {
  // 使用本地变量，防止频繁触发本地同步
  const [draftTitle, setDraftTitle] = useState('');

  const elemRef = useRef();
  const [vd, setVd] = useState<Vditor>();

  const service = useCompletion();

  const handleSend = async () => {
    try {
      service.setTitle(draftTitle);

      const draftContent = vd.getValue();
      if (!draftContent) return;

      const itemId = service.data.id;
      const newContent = await service.complete(draftContent);

      // TODO 需要有效的解决异步副作用的问题
      if (itemId === service.data.id) {
        // setDraftContent(`${draftContent}\n${newContent}`);
        // vd.setValue(`${draftContent}\n${newContent}`);
        vd.updateValue(newContent);
      }
    } catch (ex) {
      Toast.error(ex.message);
    }
  };

  useEffect(() => {
    if (!elemRef.current) return;

    const vditor = new Vditor(elemRef.current, {
      height: '100%',
      placeholder: '为冰淇淋店设计一个标语',
      cache: {
        enable: false,
      },
      after: () => {
        vditor.setValue(service.data.content);
        setVd(vditor);
      },
    });
  }, [service.data.content, elemRef]);

  useEffect(() => {
    if (vd) {
      vd.setValue(service.data.content);
    }
  }, [vd, service.data.id, service.data.content]);

  useEffect(() => {
    setDraftTitle(service.data.title);
  }, [service.data.id, service.data.title]);

  return (
    <div className="flex flex-col items-stretch w-full min-h-0 bg-gray-100">
      <header
        className={`ai-header flex justify-between w-full bg-white border-b-[1px]`}
      >
        <input
          className="flex-1 px-4 focus:outline-none"
          type="text"
          maxLength={20}
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value.trim())}
        />
        <div className="p-2">
          <SendButton
            text="提交"
            loading={service.sending}
            onClick={handleSend}
          />
        </div>
      </header>
      <div className="flex-1 flex flex-col w-full p-2 overflow-hidden">
        <div className="mb-2 p-2 text-xs bg-yellow-100 text-yellow-700">
          警告：所有数据都存储在浏览器本地，请及时复制到其他存储空间保存！
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">
          <div id="editor" ref={elemRef}></div>
        </div>
      </div>
    </div>
  );
}
