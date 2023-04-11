import { useState } from 'react';
import Toast from 'react-hot-toast';

import { ChatCompletionRequestMessage } from '@ai-chat/openai/openai';
import openai from '@/shared/client/openai';

import { useAppSelector } from '../store';

import type { IChat } from '../models/chats';
import type { IContact } from '../models/contacts';
import type { IMessage } from '../models/messages';

import { useMessagesDataSource } from './useMessagesDataSource';
import { useCurrentUser } from './useCurrentUser';

export function useChatService(talker: IContact, chat: IChat) {
  const [sending, setSending] = useState(false);
  const messagesDS = useMessagesDataSource();

  const user = useCurrentUser();
  const prefs = useAppSelector((state) => state.preferences);

  const send = async (messages: IMessage[]) => {
    try {
      setSending(true);

      const chatId = chat.id;

      const { reportAssistantMessage, maxMessages } = prefs.message;

      const chatMessages: ChatCompletionRequestMessage[] = [];
      const finalMessages: ChatCompletionRequestMessage[] = [];

      for (const item of messages) {
        if (item.role === 'system') {
          finalMessages.push({
            role: item.role,
            content: item.content,
          });
        } else if (item.role === 'assistant') {
          if (reportAssistantMessage) {
            chatMessages.push({
              role: item.role,
              content: item.content,
            });
          }
        } else {
          chatMessages.push({
            role: item.role,
            content: item.content,
          });
        }
      }

      // 防止消息过大导致请求失败
      if (chatMessages.length > maxMessages) {
        finalMessages.push(...chatMessages.slice(-maxMessages));
      } else {
        finalMessages.push(...chatMessages);
      }

      const res = await openai.createChatCompletion({
        model: prefs.chat.model,
        user: user.id,
        temperature: prefs.chat.temperature,
        max_tokens: prefs.chat.maxTokens,
        messages: finalMessages,
      });

      messagesDS.create({
        chat_id: chatId,
        type: 'text',
        content: res.choices[0].message.content,
        role: 'assistant',
      });
    } catch (ex) {
      Toast.error(ex.message);
    } finally {
      setSending(false);
    }
  };

  return [sending, send] as const;
}
