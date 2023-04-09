import { FakeField, FakeFieldOptions } from './field';
import type { FakeJson, FakeRecord } from './types';

export type FakeSchema<T extends FakeRecord = FakeRecord> = {
  name: string;
  initialValue: () => Partial<T>;
  validate(data: Partial<T>): void | never;
  serialize: (item: T) => string;
  deserialize: (raw: FakeJson) => T;
  shouldSync: (source: Partial<T>, item?: T) => boolean;
};

export type FakeSchemaDefinition<T extends FakeRecord = FakeRecord> = Partial<
  Omit<FakeSchema<T>, 'name' | 'deserialize'>
> & {
  name: string;
  fields: Array<string | (FakeFieldOptions & { name: string })>;
};

export function buildSchema<T extends FakeRecord = FakeRecord>(
  definition: FakeSchemaDefinition<T>
): FakeSchema<T> {
  const { name, shouldSync = () => true } = definition;

  const fields: FakeField[] = definition.fields.map((nameOrDef) => {
    if (typeof nameOrDef === 'string') {
      return new FakeField(nameOrDef);
    }

    const { name, ...schema } = nameOrDef;
    return new FakeField(name, schema);
  });

  function initialValue() {
    const raw = {};

    fields.forEach((field) => {
      const value = field.default();
      if (value == null) return;

      raw[field.name] = value;
    });

    return raw;
  }

  function validate(data: Partial<T>) {
    fields.forEach((field) => {
      field.validate(data[field.name]);
    });
  }

  function deserialize(raw: FakeJson): T {
    return fields.reduce((acc, field) => {
      const value = field.output(raw[field.name]);

      // @ts-ignore
      acc[field.name] = value;
      return acc;
    }, {} as T);
  }

  function serialize(source: T): string {
    const raw: FakeJson = {};

    fields.forEach((field) => {
      const value = source[field.name];
      if (value == null) return;

      raw[field.name] = field.serialize(value);
    });

    return JSON.stringify(raw);
  }

  return {
    name,
    initialValue,
    deserialize,
    serialize,
    validate,
    shouldSync,
  };
}
