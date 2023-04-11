/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { tryDeserialize } from '@ai-chat/shared/json';

import { FakeSchema } from './schema';
import { FakeTable } from './table';

export type FakeDBConnectOptions = {
  storage?: Storage;
  schemas?: FakeSchema<any>[];
  tables?: FakeTable<any>[];
};

// TODO 支持每一个表的数据独立存储
export function createFakeDB(name: string, options: FakeDBConnectOptions) {
  const storage = options.storage || localStorage;

  const tables = createTables(options);
  const conn = createConnection(name, storage, tables);

  function connect() {
    conn.connect();
  }

  function disconnect() {
    conn.disconnect();
  }

  function clear() {
    Object.values(tables).forEach((table) => table.clear());
  }

  connect();

  return { tables, conn, connect, disconnect, clear } as const;
}

export type FakeDB = ReturnType<typeof createFakeDB>;

function createConnection(
  name: string,
  storage: Storage,
  tables: Record<string, FakeTable<any>>
) {
  function initialize() {
    const prefix = `${name}:`;
    const datasets = {};

    for (const key in storage) {
      if (key.startsWith(prefix)) {
        const [_, tableName, id] = key.split(':');
        if (!(tableName && id)) continue;

        const value = storage.getItem(key);
        if (value == null) continue;

        const table = tables[tableName];
        if (!table) continue;

        const data = tryDeserialize(value);

        datasets[tableName] = datasets[tableName] || [];
        datasets[tableName].push(data);
      }
    }

    for (const key in tables) {
      const table = tables[key];
      const data = datasets[key] || [];

      table.init(data);
    }
  }

  // TODO 同步可能导致很多问题，暂时不实现
  // function handleStorageEvent({ key, newValue }: StorageEvent) {
  //   // 用户清空了所有数据
  //   if (key == null) {
  //     Object.values(tables).forEach((table) => table.syncClear());
  //     return;
  //   }

  //   const [dbName, tableName, id] = key.split(':');
  //   if (dbName !== name) return;

  //   const table = tables[tableName];
  //   if (!table) return;

  //   if (newValue == null) {
  //     table.syncDelete(id);
  //   } else {
  //     table.syncUpdate(JSON.parse(newValue));
  //   }
  // }

  function connect() {
    initialize();

    Object.values(tables).forEach((table) => {
      setupTableListeners(storage, name, table);
    });

    // window.addEventListener('storage', handleStorageEvent);
  }

  function disconnect() {
    // window.removeEventListener('storage', handleStorageEvent);
  }

  return {
    connect,
    disconnect,
  } as const;
}

function createTables(options: FakeDBConnectOptions) {
  const tables: Record<string, FakeTable> = {};

  options.tables?.forEach((table) => {
    tables[table.name] = table;
  });

  options.schemas?.forEach((schema) => {
    tables[schema.name] = new FakeTable(schema);
  });

  return tables;
}

function setupTableListeners(
  storage: Storage,
  dbName: string,
  table: FakeTable<any>
) {
  const save = (item) => {
    storage.setItem(
      `${dbName}:${table.name}:${item.id}`,
      table.schema.serialize(item)
    );
  };

  table.addEventListener('create', ({ detail: item }: CustomEvent<any>) =>
    save(item)
  );
  table.addEventListener('update', ({ detail: item }: CustomEvent<any>) =>
    save(item)
  );
  table.addEventListener('delete', ({ detail: id }: CustomEvent<string>) => {
    storage.removeItem(`${dbName}:${table.name}:${id}`);
  });
  table.addEventListener('clear', ({ detail: ids }: CustomEvent<string[]>) => {
    ids.forEach((id) => {
      storage.removeItem(`${dbName}:${table.name}:${id}`);
    });
  });
}
