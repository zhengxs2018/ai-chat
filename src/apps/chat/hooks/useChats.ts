import { useFakeList } from '@ai-chat/fake-db';

import { IChat } from '../models';

export function useChats() {
  return useFakeList<IChat>('chats');
}
