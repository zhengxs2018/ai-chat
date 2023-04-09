import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';

import PrimarySidebar from '../../../components/PrimarySidebar';

import { useNotes } from '../../../hooks';

export type ContactsAsideProps = {
  className?: string;
};

export default function NotesAside() {
  const navigate = useNavigate();
  const { noteId } = useParams();

  const notes = useNotes();

  const handleCreate = () => {
    const contact = notes.create({
      title: 'New Note',
      content: '测试',
    });

    navigate(`/notes/${contact.id}`);
  };

  return (
    <PrimarySidebar className="flex flex-col">
      <div>
        <h2>笔记</h2>
        <button onClick={handleCreate}>新增</button>
      </div>
      <div>
        <ul>
          {notes.items.map((item) => (
            <li
              className={classNames({
                'bg-gray-400': item.id === noteId,
              })}
              key={item.id}
              onClick={() => navigate(`/notes/${item.id}`)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </PrimarySidebar>
  );
}
