import { useContext } from 'react';

import { ChatContext } from './useChatProvider';

export function useChatService() {
  return useContext(ChatContext);
}
