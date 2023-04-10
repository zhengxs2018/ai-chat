import {
  TrashIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ContactList, ContactItem, IContactPayload } from '@ai-chat/chat-ui';

import PrimarySidebar from '../../../components/PrimarySidebar';

import { useChatsDataSource } from '../../../hooks/useChatsDataSource';

export default function ChatsAside() {
  const navigate = useNavigate();
  const { chatId } = useParams();

  const { items, remove } = useChatsDataSource();

  const chats = useMemo<IContactPayload[]>(
    () =>
      items.map((item) => ({
        id: item.id,
        avatar: item.logo,
        name: item.title,
        bio: item.description || '暂无描述',
        date: item.date,
      })),
    [items]
  );

  const handleClick = (payload: IContactPayload) => {
    navigate(`/chats/${payload.id}`, { replace: true });
  };

  const handleTrashClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    event.stopPropagation();
    event.preventDefault();

    if (id === chatId) {
      navigate('/chats/', { replace: true, relative: 'path' });
    }

    // TODO 如何优化？
    // hack 解决路由未跳转数据已删除，导致页面报错的问题
    requestIdleCallback(() => remove(chatId));
  };

  return (
    <PrimarySidebar className="flex flex-col bg-white">
      <ContactList>
        {chats.map((item, index) => (
          <ContactItem
            index={index}
            active={chatId === item.id}
            payload={item}
            extra={
              <button
                className={`font-bold p-1 rounded-md hover:bg-gray-200 active:bg-gray-300`}
                onClick={(event) => handleTrashClick(event, item.id)}
              >
                <TrashIcon className="w-[12px] h-[12px] text-gray-500" />
              </button>
            }
            key={item.id}
            onClick={handleClick}
          />
        ))}
      </ContactList>

      {chats.length === 0 && (
        <div className="ai-fcc w-full h-full">
          <div className="text-center text-sm text-gray-400 select-none">
            <ChatBubbleLeftRightIcon className="w-16 h-16 mb-2" />
            <p>没有聊天室</p>
          </div>
        </div>
      )}
    </PrimarySidebar>
  );
}
