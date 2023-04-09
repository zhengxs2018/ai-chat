import { FakeFieldSchema, FakeField } from './field';

export type JsonObject = Record<string, string | number | boolean | null>;

export type FakeSchema<T> = {
  name: string;
  initialValue: () => Partial<T>;
  validate(data: Partial<T>): void | never;
  serialize: (source: T) => string;
  deserialize: (raw: JsonObject) => T;
  shouldSync: (source: T, target?: T) => boolean;
};

export type FakeSchemaDefinition<T> = Partial<
  Omit<FakeSchema<T>, 'name' | 'deserialize'>
> & {
  name: string;
  fields: Array<string | (FakeFieldSchema & { name: string })>;
};

export function buildSchema<T = unknown>(
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
    const raw: Partial<T> = {};

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

  function deserialize(raw: JsonObject): T {
    return fields.reduce((acc, field) => {
      acc[field.name] = field.output(raw[field.name]);
      return acc;
    }, {} as T);
  }

  function serialize(source: T): string {
    const raw: JsonObject = {};

    fields.forEach((field) => {
      const value = source[field.name];
      if (value == null) return;

      raw[field.name] = value;
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
