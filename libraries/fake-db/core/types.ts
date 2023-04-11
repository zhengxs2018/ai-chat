export type FakeJsonValue = string | number | boolean | null | undefined;

export type FakeJson = Record<string, FakeJsonValue>;

export type FakeFieldValue = Date | FakeJsonValue;

export type FakeFieldType =
  | 'raw'
  | 'string'
  | 'int'
  | 'float'
  | 'number'
  | 'boolean'
  | 'date';

export type FakeRecord = {
  id: string;
  version: number;
  date: Date;
};

export type FakeFieldSchema<T extends FakeRecord = FakeRecord> = {
  name: string;
  initialValue: () => Partial<T>;
  validate(data: Partial<T>): void | never;
  serialize: (item: T) => string;
  deserialize: (raw: FakeJson) => T;
  shouldSync: (source: Partial<T>, item?: T) => boolean;
};

export type FakeCreateInputWith<T extends FakeRecord = FakeRecord> = Omit<
  T,
  'id' | 'version' | 'date'
>;

export type FakeUpdateInputWith<T extends FakeRecord = FakeRecord> = Omit<
  Partial<T>,
  'version' | 'date'
> & { id: string };
