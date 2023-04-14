import chat from '../assets/images/chat.png';
import note from '../assets/images/note.png';
import translator from '../assets/images/translator.png';

import { categoryMap } from './categories';

export interface App {
  name: string;
  description: string;
  link: string;
  type: string;
  image: string;
}

export default [
  {
    name: '聊天',
    description: '与 ChatGPT 对话',
    link: '/apps/chat',
    type: categoryMap.get('app').value,
    image: chat,
  },
  {
    name: '翻译',
    description: '基于 OpenAI 开发的 AI 翻译应用。',
    link: '/apps/translator',
    type: categoryMap.get('app').value,
    image: translator,
  },
  {
    name: '笔记',
    description: '集成 AI 辅助写作的笔记应用',
    link: '/apps/note',
    type: categoryMap.get('app').value,
    image: note,
  },
];
