import { PlusCircleIcon } from '@heroicons/react/24/outline';

import { useCompletionService } from '../hooks/useCompletionService';
import CompletionList from './CompletionList';
import PrimarySidebar from './PrimarySidebar';
import CompletionSideEmpty from './CompletionSideEmpty';

export type CompletionHistoryProps = {
  className?: string;
};

export default function CompletionSidebar() {
  const { data, create } = useCompletionService();

  return (
    <PrimarySidebar>
      <div className="p-[14px]">
        <button
          className="flex items-center justify-center w-full py-2 bg-white active:bg-gray-200"
          onClick={create}
        >
          <PlusCircleIcon className="w-5 h-5 mr-1"></PlusCircleIcon>
          <span className="text-sm">新增笔记</span>
        </button>
      </div>

      <div className="flex-1 flex justify-stretch min-h-0 w-full relative bg-gray-100">
        {data.length > 0 ? (
          <CompletionList></CompletionList>
        ) : (
          <CompletionSideEmpty></CompletionSideEmpty>
        )}
      </div>
    </PrimarySidebar>
  );
}
