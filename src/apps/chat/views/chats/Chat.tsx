import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  ArrowPathIcon,
  TrashIcon,
  CloudArrowDownIcon,
} from '@heroicons/react/24/outline';

import { Menu, Item, useContextMenu, ItemParams } from 'react-contexify';
import 'react-contexify/ReactContexify.css';

import {
  MessageList,
  MessageInputbar,
  IMessagePayload,
  MessageItemMouseHandler,
} from '@ai-chat/chat-ui';

import Alert from '@/components/base/Alert';
import TippyButton from '@/components/base/TippyButton';

import { saveMarkdownToFile } from '@/shared/client/file';

import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useContactsDataSource } from '../../hooks/useContactsDataSource';
import { useChatsDataSource } from '../../hooks/useChatsDataSource';
import { useMessagesDataSource } from '../../hooks/useMessagesDataSource';
import { useChatService } from '../../hooks/useChatService';

import type { IChat } from '../../models/chats';
import type { IMessage } from '../../models/messages';
import type { IContact } from '../../models/contacts';

function buildSystemMessage({
  name,
  relationship,
  bio,
  callYou,
  hint,
}: IContact) {
  const prompt = [
    `你的姓名是${name},`,
    relationship ? `是我的${relationship},` : '',
    bio ? `${bio}.` : '',
    callYou ? `喊我${callYou}.` : '',
    hint,
  ].join('');

  return prompt.replace(/\r|\n|\s/g, '');
}

export default function Chat() {
  const { chatId } = useParams();

  const contactsDS = useContactsDataSource();
  const chatsDS = useChatsDataSource();
  const messagesDS = useMessagesDataSource();

  const user = useCurrentUser();

  const payload = useMemo<IChat>(() => chatsDS.get(chatId), [chatsDS, chatId]);

  const talker = useMemo<IContact>(
    () => contactsDS.get(payload.talker_id),
    [contactsDS, payload]
  );

  const [sending, sendMessages] = useChatService(talker, payload);

  const messages = useMemo<IMessage[]>(
    () =>
      messagesDS
        .findMany((item) => item.chat_id === chatId)
        .sort((a, b) => (a.date > b.date ? 1 : -1)),
    [chatId, messagesDS]
  );

  const chatMessages = useMemo<IMessagePayload[]>(() => {
    return messages.reduce((prev, item) => {
      // 不显示系统消息
      if (item.role === 'system') return prev;

      const self = item.role === 'user';

      prev.push({
        id: item.id,
        type: 'text',
        content: item.content,
        role: item.role,
        talker: self ? user : talker,
        self,
        date: item.date,
      });

      return prev;
    }, []);
  }, [messages, user, talker]);

  const allowRetry = useMemo(() => {
    if (messages.length === 0) return false;

    const msg = messages[messages.length - 1];

    // 如果最近的一条消息是用户消息，就允许重试
    return msg.role === 'user';
  }, [messages]);

  const { show } = useContextMenu({
    id: chatId,
  });

  const handleContextMenu: MessageItemMouseHandler = (event, props) => {
    show({ event, props });
  };

  const handleContextItemClick = ({
    id,
    props,
  }: ItemParams<IMessagePayload>) => {
    switch (id) {
      case 'delete':
        // eslint-disable-next-line react/prop-types
        messagesDS.remove(props.id);
        break;
    }
  };

  const handleSend = async (content: string) => {
    const copyMessages = messages.slice(0);

    // 如果是第一条消息，那么先发送系统消息
    if (copyMessages.length === 0) {
      copyMessages.push(
        messagesDS.insertAt(0, {
          chat_id: chatId,
          type: 'text',
          content: buildSystemMessage(talker),
          role: 'system',
        })
      );
    }

    copyMessages.push(
      messagesDS.create({
        chat_id: chatId,
        type: 'text',
        content,
        role: 'user',
      })
    );

    sendMessages(messages);
  };

  function handleSave() {
    saveMarkdownToFile(payload.title, messages);
  }

  const handleRetry = () => {
    sendMessages(messages);
  };

  const handleClear = () => {
    messagesDS.removeMany((item) => item.chat_id === chatId);
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
      <MessageList
        className="flex-1 bg-gray-100"
        messages={chatMessages}
        onContextMenu={handleContextMenu}
      />
      <Menu id={chatId} className="ai-context-menu">
        <Item id="delete" onClick={handleContextItemClick}>
          删除
        </Item>
      </Menu>
      <MessageInputbar
        className="bg-gray-100"
        sending={sending}
        onSend={handleSend}
      >
        {allowRetry && (
          <TippyButton
            className="mr-4 hover:bg-gray-200 active:bg-gray-300"
            tooltip="重试"
            placement="top"
            disabled={sending}
            onClick={handleRetry}
          >
            <ArrowPathIcon className="w-6 h-6 text-gray-500" />
          </TippyButton>
        )}
        {chatMessages.length > 0 && (
          <>
            <TippyButton
              className="mr-4 hover:bg-gray-200 active:bg-gray-300"
              tooltip="保存"
              placement="top"
              onClick={handleSave}
            >
              <CloudArrowDownIcon className="w-6 h-6 text-gray-500" />
            </TippyButton>
            <TippyButton
              className="hover:bg-gray-200 active:bg-gray-300"
              tooltip="清空"
              placement="top"
              disabled={sending}
              onClick={handleClear}
            >
              <TrashIcon className="w-6 h-6 text-gray-500" />
            </TippyButton>
          </>
        )}
      </MessageInputbar>
    </div>
  );
}
