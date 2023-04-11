import { v4 as uuid } from 'uuid';

import { FakeField, FakeFieldOptions } from './field';
import type { FakeJson, FakeRecord } from './types';

export type FakeSchema<T extends FakeRecord = FakeRecord> = {
  name: string;
  fields: FakeField[];
  initialValue: () => FakeJson[];
  validate(data: Partial<T>): void | never;
  serialize: (item: T) => string;
  deserialize: (raw: FakeJson) => T;
  shouldSync: (source: Partial<T>, item?: T) => boolean;
};

export type FakeSchemaDefinition<T extends FakeRecord = FakeRecord> = Partial<
  Omit<FakeSchema<T>, 'fields' | 'deserialize'>
> & {
  fields: Array<string | (FakeFieldOptions & { name: string })>;
};

export function buildSchema<T extends FakeRecord = FakeRecord>(
  definition: FakeSchemaDefinition<T>
): FakeSchema<T> {
  const { name, initialValue = () => [], shouldSync = () => true } = definition;

  const fields: FakeField[] = [
    new FakeField('id', { type: 'string', default: uuid }),
    new FakeField('version', { type: 'int', default: 0 }),
    new FakeField('date', { type: 'date', default: () => new Date() }),
  ];

  definition.fields.forEach((nameOrDef) => {
    if (typeof nameOrDef === 'string') {
      fields.push(new FakeField(nameOrDef));
      return;
    }

    const { name, ...schema } = nameOrDef;
    fields.push(new FakeField(name, schema));
  });

  function validate(data: Partial<T>) {
    fields.forEach((field) => {
      field.validate(data[field.name]);
    });
  }

  function deserialize(raw: FakeJson): T {
    return fields.reduce((acc, field) => {
      const value = field.output(raw[field.name]);

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
    fields,
    initialValue,
    deserialize,
    serialize,
    validate,
    shouldSync,
  };
}
