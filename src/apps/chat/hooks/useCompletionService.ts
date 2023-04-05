/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react';

import { CompletionContext } from './useCompletionProvider';

export function useCompletionService() {
  return useContext(CompletionContext);
}
