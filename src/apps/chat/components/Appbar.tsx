import clsx from 'clsx';
import {
  ChatBubbleBottomCenterIcon,
  BookOpenIcon,
  UsersIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid';

import { useLocation } from 'react-router-dom';

import { openInNewWindow } from '@ai-chat/shared/client/native';

import ActionBar from '@/components/app/ActionBar';
import ActionLink from '@/components/app/ActionLink';
import ActionButton from '@/components/app/ActionButton';

import ActivitybarUser from './ActivitybarUser';
import { useAppDispatch } from '../store';
import { openPreferencesPopup } from '../store/app';

export type ActivitybarProps = {
  className?: string;
};

export default function Appbar({ className }: ActivitybarProps) {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const showPreferencesPopup = () => {
    dispatch(openPreferencesPopup());
  };

  const handleOpenNoteApp = () => {
    openInNewWindow('/apps/note', 'note', 1024, 768);
  };

  return (
    <div
      className={clsx(
        'ai-activitybar flex-col h-full hidden md:flex',
        className
      )}
    >
      <div className="ai-fcc mb-4">
        <ActivitybarUser />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <ActionBar>
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
        </ActionBar>
        <ActionBar>
          <ActionButton text="笔记" onClick={handleOpenNoteApp}>
            <BookOpenIcon className="action-button-icon" />
          </ActionButton>
          <ActionButton text="设置" onClick={showPreferencesPopup}>
            <Cog6ToothIcon className="action-button-icon" />
          </ActionButton>
        </ActionBar>
      </div>
    </div>
  );
}
