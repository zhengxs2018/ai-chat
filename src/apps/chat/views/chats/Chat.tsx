import { useParams } from 'react-router-dom';

import { useChat } from '../../hooks/useChat';

export default function Chat() {
  const { chatId } = useParams();
  const [data, messages, send] = useChat(chatId);

  return (
    <div className="h-full w-full">
      <div>{data.id}</div>
      <br />
      <div>
        <ul>
          {messages.map((msg) => {
            return (
              <li key={msg.id}>
                {msg.id} - {msg.content}
              </li>
            );
          })}
        </ul>
      </div>
      <br />
      <button onClick={() => send('xxx')}>发送</button>
    </div>
  );
}
