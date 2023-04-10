export function trySerialize(payload: unknown): string | null {
  try {
    return JSON.stringify(payload);
  } catch {
    return null;
  }
}

export function tryDeserialize<T = unknown>(raw: string): T {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
