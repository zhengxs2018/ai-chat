import classNames from 'classnames';
import {
  ChatBubbleBottomCenterIcon,
  BookOpenIcon,
  UsersIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid';

import { useLocation } from 'react-router-dom';

import ActivitybarUser from './ActivitybarUser';
import ActionLink from './ActionLink';
import ActionButton from './ActionButton';

import { useAppDispatch } from '../store';
import { openPreferencesPopup } from '../store/app';

export type ActivitybarProps = {
  className?: string;
};

export default function Activitybar({ className }: ActivitybarProps) {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const showPreferencesPopup = () => {
    dispatch(openPreferencesPopup());
  };

  return (
    <div
      className={classNames(
        'ai-activitybar flex-col h-full hidden md:flex',
        className
      )}
    >
      <div className="ai-fcc mb-4">
        <ActivitybarUser />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col">
          <ActionLink
            text="聊天"
            active={pathname.startsWith('/chats')}
            to="/chats"
          >
            <ChatBubbleBottomCenterIcon className="action-button-icon" />
          </ActionLink>
          <ActionLink
            text="通讯录"
            active={pathname.startsWith('/contacts')}
            to="/contacts"
          >
            <UsersIcon className="action-button-icon" />
          </ActionLink>
          <ActionLink
            text="笔记"
            active={pathname.startsWith('/notes')}
            to="/notes"
          >
            <BookOpenIcon className="action-button-icon" />
          </ActionLink>
        </div>
        <div className="flex flex-col">
          <ActionButton text="设置" onClick={showPreferencesPopup}>
            <Cog6ToothIcon className="action-button-icon" />
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
