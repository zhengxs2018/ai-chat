export function isInvalidDate(date: Date): boolean {
  return Number.isNaN(date.getTime());
}

export function isInvalidValue(value: unknown): boolean {
  return value == null || Number.isNaN(value);
}
