import { isInvalidValue, isInvalidDate } from '@ai-chat/shared/utils';

import type { FakeFieldValue, FakeFieldType, FakeJsonValue } from './types';
import { FieldRequiredError } from './errors';

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

export interface FakeFieldOptions<T extends FakeFieldValue = FakeFieldValue> {
  required?: boolean;
  type?: FakeFieldType;
  format?: (raw: string) => T;
  default?: (() => T) | T;
}

export class FakeField<T extends FakeFieldValue = FakeFieldValue> {
  name: string;

  options: FakeFieldOptions<T>;

  constructor(name: string, options?: FakeFieldOptions<T>) {
    this.name = name;
    this.options = options || {};
  }

  required() {
    return this.options.required === true;
  }

  validate(value: T) {
    if (this.required && isInvalidValue(value)) {
      throw new FieldRequiredError(this.name);
    }
  }

  format(raw: string | number | boolean | null): T | undefined {
    const { type, format = deserializes[type] } = this.options;
    return format?.(raw) ?? raw ?? this.default();
  }

  default(): T {
    const defaultValue = this.options.default;
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

  serialize(value: T): FakeJsonValue {
    return value instanceof Date ? value.toISOString() : value;
  }
}
