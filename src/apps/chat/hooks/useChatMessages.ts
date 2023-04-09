import { useFakeList } from '@ai-chat/fake-db';

import { MessageItem } from '../models';

export function useChatMessages() {
  return useFakeList<MessageItem>('messages');
}
