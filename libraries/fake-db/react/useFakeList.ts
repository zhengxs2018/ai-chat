import type { FakeRecord } from '../core';

import { useFakeClient } from './useFakeClient';
import type { FakeList } from './createFakeList';

export function useFakeList<T extends FakeRecord = FakeRecord>(name: string) {
  const { lists } = useFakeClient();

  return lists[name] as FakeList<T>;
}
