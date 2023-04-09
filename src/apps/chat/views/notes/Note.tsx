import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Toast from 'react-hot-toast';

import Alert from '@/components/base/Alert';

import { useNote } from '../../hooks';
import RichEditor from '../../components/RichEditor';

export default function Note() {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const [note, op] = useNote(noteId);

  // hack 解决数据回流问题
  const [initialValue, setInitialValue] = useState('');

  // 页面内维护的状态，只有保存时才会同步到 store
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleSave() {
    if (!title) return Toast.error('标题不能为空');
    if (!content || content === '\n') return Toast.error('内容不能为空');

    console.log(content);

    // 如果内容没有变化，则不保存
    if (content === note.content && title === note.title) return;

    op.save({ title, content });
  }

  useEffect(() => {
    if (!note) return navigate('/notes');

    const { title, content } = note;

    setTitle(title);
    setContent(content);
    setInitialValue(content);
  }, [note]);

  return (
    <div className="flex-1 flex flex-col w-full h-full">
      <header
        className={`ai-header flex justify-between w-full bg-white border-b-[1px]`}
      >
        <input
          className="flex-1 px-4 focus:outline-none"
          type="text"
          maxLength={20}
          value={title}
          onChange={(e) => setTitle(e.target.value.trim())}
        />
        <div className="p-2">
          <button
            className="flex flex-row items-center space-x-2 px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-tr from-indigo-500 to-purple-500 transition-colors duration-300 hover:from-indigo-600 hover:to-purple-600"
            type="button"
            onClick={handleSave}
          >
            保存
          </button>
        </div>
      </header>
      <div className="flex-1 flex flex-col w-full p-2 overflow-hidden">
        <Alert
          type="warning"
          text="警告：数据存储在浏览器本地，请及时复制到其他存储空间保存！"
        />
        <div className="flex-1 overflow-hidden">
          <RichEditor
            id={noteId}
            value={initialValue}
            className="w-full h-full"
            onChange={(c) => setContent(c.trim())}
            key={noteId}
          />
        </div>
      </div>
    </div>
  );
}
