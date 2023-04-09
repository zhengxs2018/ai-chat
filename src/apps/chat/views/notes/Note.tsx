import { useParams } from 'react-router-dom';
import { useNote } from '../../hooks';

export default function Note() {
  const { noteId } = useParams();
  const [note] = useNote(noteId);

  return (
    <div className="w-full h-full overflow-hidden">
      <p>{note.id}</p>
      <p>{note.title}</p>
    </div>
  );
}
