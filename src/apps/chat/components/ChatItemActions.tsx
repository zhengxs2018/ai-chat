import Tippy from '@tippyjs/react';
import { TrashIcon } from '@heroicons/react/24/outline';

import type { ContactContentProps } from '@/components/message/interfaces';

import { useChatService } from '../hooks/useChatService';

export default function ChatActions(props: ContactContentProps) {
  const { remove } = useChatService();

  const handleTrashClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    remove(props.payload.id);
  };

  return (
    <Tippy
      content="删除"
      placement="left"
      duration={0}
      hideOnClick={true}
      trigger={'mouseenter'}
    >
      <button
        className={`font-bold p-1 rounded-md hover:bg-gray-200 active:bg-gray-300`}
        onClick={handleTrashClick}
      >
        <TrashIcon className="w-[12px] h-[12px] text-gray-500" />
      </button>
    </Tippy>
  );
}
