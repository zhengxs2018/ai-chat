import { FakeSchema } from './schema';
import { FakeTable } from './table';

export type FakeDBConnectOptions = {
  schemas?: FakeSchema<any>[];
  tables?: FakeTable<any>[];
};

export type FakeDB = Record<string, FakeTable> & {
  connect: () => void;
  clear: () => void;
};

export function createFakeDB(
  name: string,
  options: FakeDBConnectOptions
): FakeDB {
  const tables: Record<string, FakeTable> = {};

  options.tables?.forEach((table) => {
    tables[table.name] = table;
  });

  options.schemas?.forEach((schema) => {
    tables[schema.name] = new FakeTable(schema);
  });

  function initialize() {
    const prefix = `${name}:`;
    for (const key in localStorage) {
      if (key.startsWith(prefix)) {
        const [_, tableName, id] = key.split(':');
        if (!(tableName && id)) continue;

        const value = localStorage.getItem(key);
        if (value == null) continue;

        const table = tables[tableName];
        if (!table) continue;

        table.syncUpdate(JSON.parse(value));
      }
    }
  }

  function syncStorageToTable({ key, newValue }: StorageEvent) {
    // 用户清空了所有数据
    if (key == null) {
      Object.values(tables).forEach((table) => table.syncClear());
      return;
    }

    const [dbName, tableName, id] = key.split(':');
    if (dbName !== name) return;

    const table = tables[tableName];
    if (!table) return;

    if (newValue == null) {
      table.syncDelete(id);
    } else {
      table.syncUpdate(JSON.parse(newValue));
    }
  }

  function setupListeners() {
    Object.values(tables).forEach((table) => {
      syncTableToStorage(name, table);
    });
    window.addEventListener('storage', syncStorageToTable);
  }

  function clear() {
    Object.values(tables).forEach((table) => table.clear());
  }

  function connect() {
    initialize();
    setupListeners();
  }

  return Object.assign({}, tables, { connect, clear });
}

function syncTableToStorage(dbName: string, table: FakeTable<any>) {
  const save = (item) => {
    localStorage.setItem(
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
    localStorage.removeItem(`${dbName}:${table.name}:${id}`);
  });
  table.addEventListener('clear', ({ detail: ids }: CustomEvent<string[]>) => {
    ids.forEach((id) => {
      localStorage.removeItem(`${dbName}:${table.name}:${id}`);
    });
  });
}
