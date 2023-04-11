/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo } from 'react';
import { useList } from 'react-use';

import type {
  FakeTable,
  FakeRecord,
  FakeCreateInputWith,
  FakeUpdateInputWith,
} from '../core';

function isSame(a: FakeRecord, b: FakeRecord) {
  return a.id === b.id;
}

export function createFakeDataSource<T extends FakeRecord = FakeRecord>(
  table: FakeTable<T>
) {
  const [items, op] = useList(table.values());

  const map = useMemo(() => {
    const record = {};

    for (const item of items) {
      record[item.id] = item;
    }

    return record;
  }, [items]);

  function get(id: string): T | undefined {
    return map[id];
  }

  function has(id: string): boolean {
    // eslint-disable-next-line no-prototype-builtins
    return map.hasOwnProperty(id);
  }

  function findFirst(predicate: (value: T) => boolean) {
    return items.find(predicate);
  }

  function findMany(predicate: (value: T) => boolean) {
    return items.filter(predicate);
  }

  function create(item: FakeCreateInputWith<T>) {
    const newItem = table.create(item);
    op.push(newItem);
    return newItem;
  }

  function insertAt(index: number, item: FakeCreateInputWith<T>) {
    const newItem = table.create(item);
    op.insertAt(index, newItem);
    return newItem;
  }

  function update(item: FakeUpdateInputWith<T>) {
    const newItem = table.update(item);
    op.update(isSame, newItem);
    return newItem;
  }

  function upsert(item: FakeCreateInputWith<T> | FakeUpdateInputWith<T>) {
    if (has((item as FakeUpdateInputWith<T>).id)) {
      return update(item as FakeUpdateInputWith<T>);
    }

    return create(item as FakeCreateInputWith<T>);
  }

  function remove(id: string) {
    table.delete(id);
    op.removeAt(items.findIndex((item) => item.id === id));
  }

  function removeMany(predicate: (value: T) => boolean) {
    const ids: string[] = [];

    op.filter((item) => {
      const flag = predicate(item) === false;
      ids.push(item.id);
      return flag;
    });

    for (const id of ids) {
      table.delete(id);
    }
  }

  return {
    items,
    get,
    has,
    findFirst,
    findMany,
    create,
    insertAt,
    update,
    upsert,
    remove,
    removeMany,
  } as const;
}

export type FakeDataSource<T extends FakeRecord = FakeRecord> = ReturnType<
  typeof createFakeDataSource<T>
>;
