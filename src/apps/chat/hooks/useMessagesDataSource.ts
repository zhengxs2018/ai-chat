import { useFakeDataSource } from '@ai-chat/fake-db';

import { IMessage } from '../models';

export function useMessagesDataSource() {
  return useFakeDataSource<IMessage>('messages');
}
