import type { FakeRecord } from '../core';

import { useFakeClient } from './useFakeClient';
import type { FakeDataSource } from './createFakeDataSource';

export function useFakeDataSource<T extends FakeRecord = FakeRecord>(
  name: string
) {
  const { lists } = useFakeClient();

  return lists[name] as FakeDataSource<T>;
}
