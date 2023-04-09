import {
  FakeSchema,
  FakeSchemaDefinition,
  JsonObject,
  buildSchema,
} from './schema';

export type FakeTableRecord = {
  id: string;
  version: number;
  [key: string]: unknown;
};

export class FakeTable<T extends FakeTableRecord> extends EventTarget {
  name: string;

  store = new Map<string, T>();

  constructor(public schema: FakeSchema<T>) {
    super();

    this.name = schema.name;
  }

  get(id: string) {
    return this.store.get(id);
  }

  create(part: Partial<Omit<FakeTableRecord, 'id'>>) {
    const initial = this.schema.initialValue();
    const data = { ...initial, ...part, version: 0 };

    // 数据验证
    this.schema.validate(data);

    // 因为是假的数据库，所以不需要检查
    this.store.set(data.id, data as T);

    this.dispatchEvent(new CustomEvent('create', { detail: data }));

    return data;
  }

  update(part: Partial<FakeTableRecord & { id: string }>) {
    const id = part.id;
    const store = this.store;
    const old = store.get(id);

    if (!old) {
      throw new Error(`Record ${id} not found`);
    }

    const data = { ...old, ...part, version: old.version + 1 };

    store.set(id, data);

    this.dispatchEvent(new CustomEvent('update', { detail: data }));
    return data;
  }

  upsert(part: Partial<FakeTableRecord & { id: string }>) {
    return this.store.has(part.id) ? this.update(part) : this.create(part);
  }

  delete(id: string) {
    const store = this.store;

    if (store.has(id)) {
      store.delete(id);
      this.dispatchEvent(new CustomEvent('delete', { detail: id }));
    }
  }

  clear() {
    if (this.store.size === 0) return;

    const ids = Array.from(this.store.keys());

    this.store.clear();
    this.dispatchEvent(new CustomEvent('clear', { detail: ids }));
  }

  getAll() {
    return Array.from(this.store.values());
  }

  syncUpdate(raw: JsonObject) {
    const { store, schema } = this;
    const { deserialize, shouldSync } = schema;

    const item = deserialize(raw);
    const local = store.get(item.id);

    // 如果版本号比本地的低，就不同步
    if (local && item.version < local.version) return;

    if (shouldSync(item, local)) {
      const data = { ...local, ...item };
      store.set(item.id, data);
      this.dispatchEvent(new CustomEvent('sync-update', { detail: data }));
    }
  }

  syncDelete(id: string) {
    const { store } = this;

    if (store.has(id)) {
      store.delete(id);
      this.dispatchEvent(new CustomEvent('sync-delete', { detail: id }));
    }
  }

  syncClear() {
    this.store.clear();
  }

  static build<T extends FakeTableRecord>(definition: FakeSchemaDefinition<T>) {
    return new FakeTable(buildSchema(definition));
  }
}
