import React from 'react';

import { FakeClientContext } from './FakeClientProvider';

export function useFakeClient() {
  return React.useContext(FakeClientContext);
}
