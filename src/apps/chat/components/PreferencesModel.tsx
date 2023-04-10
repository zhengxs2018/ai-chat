import { useState } from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

import SettingModel from '@/components/settings/SettingModel';
import OpenAiIcon from '@/components/icons/OpenAiIcon';

import { useAppSelector, useAppDispatch } from '../store';
import { closePreferencesPopup } from '../store/app';

import PreferenceOpenAi from './PreferenceOpenAi';
import PreferenceChat from './PreferenceChat';

export default function PreferencesModel() {
  const dispatch = useAppDispatch();
  const visible = useAppSelector((state) => state.app.preferencesVisible);

  const [selected, setSelected] = useState<string>('OpenAI');
  const catalogItems = ['OpenAI', '聊天信息'];
  const catalogIcons = [
    <OpenAiIcon className="w-5 h-5" key="openai" />,
    <ChatBubbleLeftRightIcon className="w-5 h-5" key="chat" />,
  ];
  const contents = [
    <PreferenceOpenAi key="openai" />,
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
