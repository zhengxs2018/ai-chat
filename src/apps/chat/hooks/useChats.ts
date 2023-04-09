import { useFakeList } from '@ai-chat/fake-db';

import { ChatItem } from '../models';

export function useChats() {
  return useFakeList<ChatItem>('chats');
}
