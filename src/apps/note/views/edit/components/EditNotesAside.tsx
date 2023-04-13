import { PlusCircleIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';

import PrimarySidebar from '@/components/app/PrimarySidebar';
import { useNotesDataSource } from '../../../hooks/useNotesDataSource';

import NoteList from '../../../components/NoteList';
import NoteItem from '../../../components/NoteItem';

export type ContactsAsideProps = {
  className?: string;
};

export default function NotesAside() {
  const navigate = useNavigate();
  const { noteId } = useParams();

  const notes = useNotesDataSource();

  const handleCreate = () => {
    const contact = notes.create({
      title: 'New Note',
      content: '',
    });

    navigate(`/edit/${contact.id}`);
  };

  return (
    <PrimarySidebar className="flex flex-col">
      <div className="p-[14px]">
        <button
          className="flex items-center justify-center w-full py-2 select-none text-gray-600 hover:text-gray-500 bg-white hover:bg-gray-200 active:bg-gray-200"
          onClick={handleCreate}
        >
          <PlusCircleIcon className="w-5 h-5 mr-1"></PlusCircleIcon>
          <span className="text-sm">新增笔记</span>
        </button>
      </div>

      {notes.items.length > 0 ? (
        <NoteList>
          {notes.items.map((item) => (
            <NoteItem
              active={item.id === noteId}
              payload={item}
              key={item.id}
              onClick={() => navigate(`/edit/${item.id}`)}
              onRemove={() => notes.remove(item.id)}
            />
          ))}
        </NoteList>
      ) : (
        <div className="ai-fcc w-full h-full">
          <div className="text-center text-sm text-gray-400 select-none">
            <BookOpenIcon className="w-16 h-16 mb-2" />
            <p>还没有笔记</p>
          </div>
        </div>
      )}
    </PrimarySidebar>
  );
}
