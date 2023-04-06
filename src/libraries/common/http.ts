/* eslint-disable @typescript-eslint/no-explicit-any */

export function serializeDataIfNeeded(data: any, needsSerialization?: boolean) {
  if (!data) return;

  return needsSerialization && typeof data === 'object'
    ? JSON.stringify(data)
    : data || '';
}

export function convertToFormDataIfNeeded(
  data: any,
  needsConversion?: boolean
) {
  if (!data) return;

  if (typeof data === 'object' && needsConversion) {
    const formData = new FormData();

    for (const key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (value in File) {
          formData.append(key, value, value.name);
        } else if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, value[key]);
        }
      }
    }

    return formData;
  }

  return data;
}

export function mergeHeaders(headers: Headers, init?: HeadersInit) {
  const mergedHeaders = new Headers(init);

  headers.forEach((value, key) => {
    mergedHeaders.append(key, value);
  });

  return mergedHeaders;
}

export function removeLeadingSlash(path: string) {
  return path.startsWith('/') ? path.slice(1) : path;
}

export function removeTrailingSlash(path: string) {
  return path.endsWith('/') ? path.slice(0, -1) : path;
}
