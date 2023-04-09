import React from 'react';

import type { FakeDB, FakeTable } from '../core';

import { createFakeList, FakeList } from './createFakeList';

export type FakeClient = {
  tables: Record<string, FakeTable>;
  lists: Record<string, FakeList>;
};

export const FakeClientContext = React.createContext<FakeClient>(null);

export type FakeClientProps = React.PropsWithChildren<{
  value: FakeDB;
}>;

export function FakeClientProvider({ value, children }: FakeClientProps) {
  const { tables } = value;
  const lists: Record<string, FakeList> = {};

  Object.values(tables).forEach((table) => {
    lists[table.name] = createFakeList(table);
  });

  return (
    <FakeClientContext.Provider value={{ tables, lists }}>
      {children}
    </FakeClientContext.Provider>
  );
}
