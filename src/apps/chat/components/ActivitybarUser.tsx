import { Menu } from '@headlessui/react';
import {
  AdjustmentsHorizontalIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';
import Avvvatars from 'avvvatars-react';

import Toast from 'react-hot-toast';

import DropdownMenu from '@/components/base/DropdownMenu';

import { useAppDispatch } from '../store';
import { openUserPopup } from '../store/app';
import { useCurrentUser } from '../hooks/useCurrentUser';

export default function ActivitybarUser() {
  const user = useCurrentUser();
  const dispatch = useAppDispatch();

  const showUserPopup = () => {
    dispatch(openUserPopup());
  };

  const handleLogout = async () => {
    Toast('下一个版本会支持退出登录');
  };

  const button = (
    <Menu.Button>
      <Avvvatars value={user.name} radius={4} />
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
            onClick={showUserPopup}
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
            onClick={handleLogout}
          >
            <PowerIcon className="w-4 h-4" />
            <span className="ml-2">退出登录</span>
          </button>
        )}
      </Menu.Item>
    </DropdownMenu>
  );
}
