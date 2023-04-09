import { useParams } from 'react-router-dom';
import { useContact } from '../../hooks';

export default function Contact() {
  const { contactId } = useParams();
  const [info] = useContact(contactId);

  return (
    <div className="w-full h-full overflow-hidden">
      <p>{info.id}</p>
      <p>{info.name}</p>
    </div>
  );
}
