import React from 'react';

import type { FakeDB, FakeTable } from '../core';

import { createFakeDataSource, FakeDataSource } from './createFakeDataSource';

export type FakeClient = {
  tables: Record<string, FakeTable>;
  lists: Record<string, FakeDataSource>;
};

export const FakeClientContext = React.createContext<FakeClient>(null);

export type FakeClientProps = React.PropsWithChildren<{
  value: FakeDB;
}>;

export function FakeClientProvider({ value, children }: FakeClientProps) {
  const { tables } = value;
  const lists: Record<string, FakeDataSource> = {};

  Object.values(tables).forEach((table) => {
    lists[table.name] = createFakeDataSource(table);
  });

  return (
    <FakeClientContext.Provider value={{ tables, lists }}>
      {children}
    </FakeClientContext.Provider>
  );
}
