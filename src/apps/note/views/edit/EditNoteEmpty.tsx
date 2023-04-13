import { useNavigate } from 'react-router-dom';
import { PlusIcon, BookOpenIcon } from '@heroicons/react/24/outline';

import Button from '@/components/base/Button';
import { useNotesDataSource } from '../../hooks/useNotesDataSource';

export default function EditNoteEmpty() {
  const navigate = useNavigate();
  const notes = useNotesDataSource();

  const handleCreate = () => {
    const contact = notes.create({
      title: 'New Note',
      content: '',
    });

    navigate(`/edit/${contact.id}`);
  };

  return (
    <div className="ai-fcc flex-col h-full w-full text-gray-400 ">
      <BookOpenIcon className="w-16 h-16 mb-2" />
      <div className="mb-6 text-sm select-none">有新的想法？记录一下吧！</div>
      <Button type="primary" onClick={handleCreate}>
        <PlusIcon className="w-4 h-4" />
        <span>创建笔记</span>
      </Button>
    </div>
  );
}
