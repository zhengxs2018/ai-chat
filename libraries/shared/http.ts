export function overrideHeaders(
  source: Headers,
  target?: Headers,
  ...keys: string[]
) {
  if (!target) return;

  keys.forEach((key) => {
    if (target.has(key)) {
      source.append(key, target.get(key) as string);
    }
  });
}

export function assignHeaders(headers: Headers, ...custom: HeadersInit[]) {
  custom.forEach((rawHeaders) => {
    new Headers(rawHeaders).forEach((value, key) => {
      headers.append(key, value);
    });
  });

  return headers;
}

export function cleanHeaders(headers: Headers, ...keys: string[]) {
  const clone = new Headers();

  keys.forEach((key) => {
    if (clone.has(key)) {
      headers.append(key, clone.get(key) as string);
    }
  });

  return clone;
}

export function isInvalidStatus(status: number) {
  return status < 200 || status >= 300;
}

export function convertToFormData(data: any): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value == null) return;

    if (value instanceof File) {
      formData.append(key, value, value.name);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, item);
      });
    } else {
      formData.append(key, value[key]);
    }
  });

  return formData;
}
