import classNames from 'classnames';
import Tippy from '@tippyjs/react';
import { TrashIcon } from '@heroicons/react/24/outline';

import type { INote } from '../../../models';

export type NoteItemProps = {
  className?: string;
  active?: boolean;
  payload: INote;
  onClick: (payload: INote) => void;
  onRemove: () => void;
};

export default function NoteItem({
  className,
  active,
  payload,
  onClick,
  onRemove,
}: NoteItemProps) {
  const handleTrashClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onRemove();
  };

  return (
    <div
      className={classNames(
        'flex justify-between py-[8px] px-[16px] cursor-pointer hover:bg-gray-200',
        active && 'bg-gray-200'
      )}
      onClick={() => onClick(payload)}
    >
      <div className="select-none">{payload.title}</div>

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
    </div>
  );
}
