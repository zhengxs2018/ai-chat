import { isInvalidValue, isInvalidDate } from '@ai-chat/shared/utils';

export const deserializes = {
  number(raw: number | string): number | undefined {
    const num = Number(raw);
    return Number.isNaN(num) ? undefined : num;
  },
  int(raw: number | string): number | undefined {
    const num = parseInt(String(raw), 10);
    return Number.isNaN(num) ? undefined : num;
  },
  date(raw: number | string): Date | undefined {
    const date = new Date(raw);
    return isInvalidDate(date) ? undefined : date;
  },
};

export type FakeFieldValueType =
  | Date
  | string
  | number
  | boolean
  | null
  | undefined;

export type FakeFieldType =
  | 'raw'
  | 'string'
  | 'int'
  | 'float'
  | 'number'
  | 'boolean'
  | 'date';

export interface FakeFieldSchema<
  T extends FakeFieldValueType = FakeFieldValueType
> {
  required?: boolean;
  type?: 'string' | 'int' | 'float' | 'number' | 'boolean' | 'date';
  format?: (raw: string) => T;
  default?: (() => T) | T;
}

export class FieldRequiredError extends Error {
  constructor(name: string) {
    super(`Field ${name} is required`);
  }
}

export class FakeField<T extends FakeFieldValueType = FakeFieldValueType> {
  name: string;

  schema: FakeFieldSchema<T>;

  constructor(name: string, schema?: FakeFieldSchema<T>) {
    this.name = name;
    this.schema = schema || {};
  }

  required() {
    return this.schema.required === true;
  }

  validate(value: T) {
    if (this.required && isInvalidValue(value)) {
      throw new FieldRequiredError(this.name);
    }
  }

  format(raw: string | number | boolean | null): T | undefined {
    const { type, format = deserializes[type] } = this.schema;
    return format?.(raw) ?? raw ?? this.default();
  }

  default(): T {
    const defaultValue = this.schema.default;
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  }

  output(raw?: string | number | boolean | null): T | undefined {
    if (isInvalidValue(raw)) return;

    const value = this.format(raw);

    if (this.required && isInvalidValue(value)) {
      throw new FieldRequiredError(this.name);
    }

    return value as T;
  }
}
