import classNames from 'classnames';

import { useCompletionService } from '../hooks/useCompletionService';

export type CompletionHistoryProps = {
  className?: string;
};

export default function CompletionList() {
  const { data, cursor } = useCompletionService();

  return (
    <div className="w-full min-h-0 overflow-x-hidden overflow-y-auto">
      {data.map((item, index) => (
        <div
          className={classNames(
            'py-[8px] px-[16px] cursor-pointer hover:bg-gray-200',
            cursor.index === index && 'bg-gray-200'
          )}
          key={item.id}
          onClick={() => cursor.set(index)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
