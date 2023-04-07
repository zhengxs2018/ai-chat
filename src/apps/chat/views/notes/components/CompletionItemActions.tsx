import Tippy from '@tippyjs/react';
import { TrashIcon } from '@heroicons/react/24/outline';

import { useCompletionService } from '../../../hooks/useCompletionService';

export type ContactContentProps = {
  id: string;
};

export default function CompletionItemActions({ id }: ContactContentProps) {
  const { remove } = useCompletionService();

  const handleTrashClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    remove(id);
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
