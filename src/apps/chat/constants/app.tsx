import {
  BookOpenIcon,
  ChatBubbleBottomCenterIcon,
  // PencilIcon,
  // PhotoIcon,
} from '@heroicons/react/24/solid';

export const APP_FEATURES = [
  {
    text: '聊天',
    icon: <ChatBubbleBottomCenterIcon className="action-button-icon" />,
    key: 'chat',
  },
  {
    text: '自动补全',
    icon: <BookOpenIcon className="action-button-icon" />,
    key: 'complete',
  },
  // {
  //   text: '编辑',
  //   icon: <PencilIcon className="action-button-icon" />,
  //   key: 'edit',
  // },
  // {
  //   text: '图像生成',
  //   icon: <PhotoIcon className="action-button-icon" />,
  //   key: 'image',
  // },
];

export const DEFAULT_APP_FEATURE = 'chat';
