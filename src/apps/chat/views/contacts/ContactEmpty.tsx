import { UserGroupIcon } from '@heroicons/react/24/outline';

export default function ContactEmpty() {
  return (
    <div className="ai-fcc flex-col h-full w-full text-gray-400 ">
      <UserGroupIcon className="w-16 h-16 mb-2" />
      <div className="mb-6 text-sm select-none">啥也没有</div>
    </div>
  );
}
