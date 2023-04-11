import { useFakeDataSource } from '@ai-chat/fake-db';

import { IChat } from '../models';

export function useChatsDataSource() {
  return useFakeDataSource<IChat>('chats');
}
