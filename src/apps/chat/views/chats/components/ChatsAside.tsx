import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { useChats } from '../../../hooks';

export type ChatsAsideProps = {
  className?: string;
};

export default function ChatsAside({ className }: ChatsAsideProps) {
  const chats = useChats();

  const handleCreate = () => {
    chats.create({
      talker_id: '1',
    });
  };

  return (
    <div className={classNames('flex flex-col', className)}>
      <div>
        <h2>Chats</h2>
        <button onClick={handleCreate}>新增</button>
      </div>
      <div>
        <ul>
          {chats.items.map((chat) => (
            <li  key={chat.id}>
              <Link to={`/chats/${chat.id}`}>
                {chat.id}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
