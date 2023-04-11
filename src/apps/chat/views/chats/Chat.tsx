import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

import {
  MessageList,
  MessageInputbar,
  IMessagePayload,
} from '@ai-chat/chat-ui';

import Alert from '@/components/base/Alert';
import TippyButton from '@/components/base/TippyButton';
import openai from '@/shared/client/openai';

import { useAppSelector } from '../../store';
// import {  } from '../../store/user';

import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useContactsDataSource } from '../../hooks/useContactsDataSource';
import { useChatsDataSource } from '../../hooks/useChatsDataSource';
import { useMessagesDataSource } from '../../hooks/useMessagesDataSource';

import type { IChat } from '../../models/chats';
import type { IMessage } from '../../models/messages';
import type { IContact } from '../../models/contacts';

export default function Chat() {
  const { chatId } = useParams();
  const [sending, setSending] = useState(false);

  const contactsDS = useContactsDataSource();
  const chatsDS = useChatsDataSource();
  const messagesDS = useMessagesDataSource();

  const user = useCurrentUser();
  const prefs = useAppSelector((state) => state.preferences);

  const payload = useMemo<IChat>(() => chatsDS.get(chatId), [chatsDS, chatId]);

  const talker = useMemo<IContact>(
    () => contactsDS.get(payload.talker_id),
    [contactsDS, payload]
  );

  const messages = useMemo<IMessage[]>(
    () => messagesDS.findMany((item) => item.chat_id === chatId),
    [chatId, messagesDS]
  );

  const chatMessages = useMemo<IMessagePayload[]>(() => {
    return messages.map((item) => {
      const self = item.role === 'user';

      return {
        id: item.id,
        type: 'text',
        content: item.content,
        role: item.role,
        talker: self ? user : talker,
        self,
        date: item.date,
      };
    });
  }, [messages, user, talker]);

  const handleSend = async (content: string) => {
    try {
      setSending(true);

      const message = messagesDS.create({
        chat_id: chatId,
        type: 'text',
        content,
        role: 'user',
      });

      const openaiMessages = messages.concat(message).map((item) => ({
        role: item.role,
        content: item.content,
      }));

      const response = await openai.createChatCompletion({
        model: prefs.chat.model,
        user: user.id,
        temperature: prefs.chat.temperature,
        max_tokens: prefs.chat.maxTokens,
        messages: openaiMessages,
      });

      console.log(response);
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    // pass
  };

  return (
    <div className="flx-1 flex flex-col h-full w-full">
      <header
        className={`flex justify-between items-center min-h-[60px] h-[60px] px-[20px] bg-white border-b-[1px]`}
      >
        {payload.title}
      </header>
      <Alert
        type="warning"
        text="警告：AI可能偶尔产生不正确或有害的信息，请注意信息识别！"
      />
      <MessageList className="flex-1 bg-gray-100" messages={chatMessages} />
      <MessageInputbar
        className="bg-gray-100"
        sending={sending}
        onSend={handleSend}
      >
        <TippyButton
          className="hover:bg-gray-200 active:bg-gray-300"
          tooltip="重试"
          placement="top"
          onClick={handleReset}
        >
          <ArrowPathIcon className="w-6 h-6 text-gray-500" />
        </TippyButton>
      </MessageInputbar>
    </div>
  );
}
