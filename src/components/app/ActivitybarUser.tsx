import { Menu } from '@headlessui/react';
import {
  AdjustmentsHorizontalIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';

import Toast from 'react-hot-toast';

import DropdownMenu from '@/components/base/DropdownMenu';

export default function ActivitybarUser() {
  const handleNoop = async () => {
    Toast('没有功能');
  };

  const button = (
    <Menu.Button>
      <div className="ai-activitybar-user bg-gray-400 opacity-60"></div>
    </Menu.Button>
  );

  return (
    <DropdownMenu
      button={button}
      className="relative"
      itemsClassName="top-0 left-[40px] w-36 ml-[20px]"
    >
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active
                ? 'bg-indigo-500 text-gray-100 active:bg-indigo-600'
                : 'text-gray-700'
            } group flex rounded-md items-center w-full px-2 py-2 text-sm font-medium`}
            onClick={handleNoop}
          >
            <AdjustmentsHorizontalIcon className="w-4 h-4" />
            <span className="ml-2">修改资料</span>
          </button>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active
                ? 'bg-indigo-500 text-gray-100 active:bg-indigo-600'
                : 'text-gray-700'
            } group flex rounded-md items-center w-full px-2 py-2 text-sm font-medium`}
            onClick={handleNoop}
          >
            <PowerIcon className="w-4 h-4" />
            <span className="ml-2">退出登录</span>
          </button>
        )}
      </Menu.Item>
    </DropdownMenu>
  );
}
