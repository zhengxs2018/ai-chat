import React from 'react';
import { useList } from 'react-use';

import type { FakeTable, FakeRecord } from '../core';

function isSame(a: FakeRecord, b: FakeRecord) {
  return a.id === b.id;
}

export function createFakeList<T extends FakeRecord = FakeRecord>(
  table: FakeTable<T>
) {
  const [items, op] = useList(table.values());

  const record = React.useMemo(() => {
    const record = {};

    for (const item of items) {
      record[item.id] = item;
    }

    return record;
  }, [items]);

  function get(id: string) {
    return record[id];
  }

  function findMany(predicate: (value: T) => boolean) {
    return items.filter(predicate);
  }

  function create(item: Partial<Omit<T, 'id' | 'version'>>) {
    const newItem = table.create(item);
    op.insertAt(0, newItem);
    return newItem;
  }

  function update(item: Partial<Omit<T, 'version'>> & { id: string }) {
    const newItem = table.update(item);
    op.update(isSame, newItem);
    return newItem;
  }

  function remove(id: string) {
    table.delete(id);
    op.removeAt(items.findIndex((item) => item.id === id));
  }

  return { items, get, findMany, create, update, remove } as const;
}

export type FakeList<T extends FakeRecord = FakeRecord> = ReturnType<
  typeof createFakeList<T>
>;
