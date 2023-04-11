import { FakeSchemaDefinition, FakeSchema, buildSchema } from './schema';
import type { FakeField } from './field';
import type { FakeJson, FakeRecord } from './types';

export class FakeTable<T extends FakeRecord = FakeRecord> extends EventTarget {
  name: string;
  fields: FakeField[];

  store = new Map<string, T>();

  constructor(public schema: FakeSchema<T>) {
    super();

    this.name = schema.name;
    this.fields = schema.fields;
  }

  init(initData: FakeJson[] = []) {
    const { store } = this;
    const { deserialize, initialValue } = this.schema;

    const data = initData.length > 0 ? initData : initialValue();

    data.forEach((raw) => {
      const item = deserialize(raw);
      store.set(item.id, item);
    });
  }

  get(id: string) {
    return this.store.get(id);
  }

  values() {
    return Array.from(this.store.values());
  }

  create(part: Partial<Omit<FakeRecord, 'id'>>): T {
    const initial = this.initialValue();
    const data = { ...initial, ...part, version: 0 } as T;

    // 数据验证
    this.schema.validate(data);

    // 因为是假的数据库，所以不需要检查
    this.store.set(data.id, data as T);

    this.dispatchEvent(new CustomEvent('create', { detail: data }));

    return data;
  }

  update(part: Partial<FakeRecord & { id: string }>) {
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

  upsert(part: Partial<FakeRecord & { id: string }>) {
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

  syncUpdate(raw: FakeJson) {
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
    if (this.store.size === 0) return;
    this.store.clear();
    this.dispatchEvent(new CustomEvent('sync-clear'));
  }

  initialValue() {
    const raw = {};

    this.fields.forEach((field) => {
      const value = field.default();
      if (value == null) return;

      raw[field.name] = value;
    });

    return raw;
  }

  static build<T extends FakeRecord>(definition: FakeSchemaDefinition<T>) {
    return new FakeTable(buildSchema(definition));
  }
}
