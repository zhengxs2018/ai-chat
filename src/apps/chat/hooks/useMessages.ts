import { useFakeList } from '@ai-chat/fake-db';

import { IMessage } from '../models';

export function useMessages() {
  return useFakeList<IMessage>('messages');
}
