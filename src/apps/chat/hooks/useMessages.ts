import { useContext } from 'react';
import { MessagesContext } from '../components/MessagesProvider';

export function useMessages() {
  return useContext(MessagesContext);
}
