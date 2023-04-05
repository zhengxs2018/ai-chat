import { PlusCircleIcon } from '@heroicons/react/24/outline';

import { useCompletionService } from '../hooks/useCompletionService';
import CompletionList from './CompletionList';
import PrimarySidebar from './PrimarySidebar';

export type CompletionHistoryProps = {
  className?: string;
};

export default function CompletionSidebar() {
  const { create } = useCompletionService();

  const handleNew = () => {
    create();
  };

  return (
    <PrimarySidebar>
      <div className="p-[14px]">
        <button
          className="flex items-center justify-center w-full py-2 bg-white active:bg-gray-200"
          onClick={handleNew}
        >
          <PlusCircleIcon className="w-5 h-5 mr-1"></PlusCircleIcon>
          <span className="text-sm">新增笔记</span>
        </button>
      </div>
      <CompletionList></CompletionList>
    </PrimarySidebar>
  );
}
