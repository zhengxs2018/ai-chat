import { useState } from 'react';
import {
  ChatBubbleLeftRightIcon,
  ChatBubbleOvalLeftIcon,
} from '@heroicons/react/24/outline';

import SettingModel from '@/components/settings/SettingModel';
// import OpenAiIcon from '@/components/icons/OpenAiIcon';

import { useAppSelector, useAppDispatch } from '../store';
import { closePreferencesPopup } from '../store/app';

// import PreferenceOpenAi from './PreferenceOpenAi';
import PreferenceChat from './PreferenceChat';
import PreferenceMessage from './PreferenceMessage';

export default function PreferencesModel() {
  const dispatch = useAppDispatch();
  const visible = useAppSelector((state) => state.app.preferencesVisible);

  const [selected, setSelected] = useState<string>('消息配置');
  const catalogItems = ['消息配置', '聊天信息'];
  const catalogIcons = [
    // <OpenAiIcon className="w-5 h-5" key="openai" />,
    <ChatBubbleOvalLeftIcon className="w-5 h-5" key="message" />,
    <ChatBubbleLeftRightIcon className="w-5 h-5" key="chat" />,
  ];
  const contents = [
    // <PreferenceOpenAi key="openai" />,
    <PreferenceMessage key="message" />,
    <PreferenceChat key="chat" />,
  ];

  const onClose = () => {
    dispatch(closePreferencesPopup());
  };

  return (
    <SettingModel
      open={visible}
      selected={selected}
      catalogIcons={catalogIcons}
      catalogItems={catalogItems}
      onSelect={setSelected}
      showConfirm={false}
      onClose={onClose}
    >
      <div className="md:w-[240px]">
        {contents[catalogItems.indexOf(selected)]}
      </div>
    </SettingModel>
  );
}
