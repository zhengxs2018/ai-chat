import { PlusIcon } from '@heroicons/react/24/outline';
import TippyButton from '@/components/base/TippyButton';

export type CompletionEmptyProps = {
  onCreate: () => void;
};

export default function CompletionEmpty({ onCreate }: CompletionEmptyProps) {
  return (
    <div className="h-full w-full ai-fcc">
      <div className="text-center text-sm text-gray-400">
        <p className="mb-4">想要创建一个新笔记？</p>

        <TippyButton
          tooltip="创建一个新的笔记"
          placement="top"
          icon={<PlusIcon className="w-4 h-4 text-gray-500" />}
          text="创建笔记"
          className="mx-auto bg-gray-200 active:bg-gray-300"
          onClick={onCreate}
        />
      </div>
    </div>
  );
}
