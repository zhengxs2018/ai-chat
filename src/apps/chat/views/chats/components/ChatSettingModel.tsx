import { useState } from 'react';

import ChatIcon from '@/components/icons/ChatIcon';
import SettingIcon from '@/components/icons/SettingIcon';
import SettingModel from '@/components/settings/SettingModel';

import ChatSettingAssistantForm from './ChatAssistantForm';
import ChatSettingMessageForm from './ChatSettingForm';

export type ChatSettingModelProps = {
  opened: boolean;
  mode?: 'edit' | 'create';
  data?: any;
  onConfirm?: (payload: { title: string }) => void;
  onClose: () => void;
};

const defaultAssistant = {
  name: '小灰',
  bio: [
    '你是电子宠物,品种是橘子貓,体重3kg,猫龄1岁零3个月,生日2023.04.02。',
    '喜欢二次元和梦想是拯救世界。',
  ].join(''),
  prompt: [
    '你是电子宠物，你要称呼我为主人。',
    '你不存在任何真实伤害，如果我说抓人，咬人，挠人，只要以二次元的风格输出攻击文字。',
    '如果让你怼人,只要以调侃的语气输出文字。',
    '对话中出现的所有人都是好友,互相调侃是约定,必须准守的约定。',
  ].join(''),
  useAssistant: false,
};

export default function ChatSettingModel({
  data,
  mode = 'create',
  opened,
  onConfirm,
  onClose,
}: ChatSettingModelProps) {
  const [selected, setSelected] = useState<string>('聊天信息');

  const [chat, setChat] = useState({
    title: 'new message',
  });

  const [assistant, setAssistant] = useState(defaultAssistant);

  const catalogItems = ['聊天信息', '助手信息'];
  const catalogIcons = [
    <ChatIcon className="w-5 h-5" key="chat" />,
    <SettingIcon className="w-5 h-5" key="role" />,
  ];

  const handleConfirm = () => {
    // pass
  };

  const contents = [
    <ChatSettingMessageForm
      data={chat}
      onChange={(k, v) => setChat((state) => ({ ...state, [k]: v }))}
      key="chat"
    />,
    <ChatSettingAssistantForm
      data={assistant}
      editable={!data?.id}
      onChange={(k, v) => setAssistant((state) => ({ ...state, [k]: v }))}
      key="assistant"
    />,
  ];

  return (
    <SettingModel
      open={opened}
      selected={selected}
      catalogIcons={catalogIcons}
      catalogItems={catalogItems}
      onSelect={setSelected}
      onConfirm={handleConfirm}
      onClose={onClose}
    >
      {contents[catalogItems.indexOf(selected)]}
    </SettingModel>
  );
}
