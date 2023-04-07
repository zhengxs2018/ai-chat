/* eslint-disable @typescript-eslint/no-explicit-any */

export function serializeDataIfNeeded(data: any): BodyInit {
  if (!data) return;

  return typeof data === 'object' ? JSON.stringify(data) : data || '';
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

export function assignHeaders(headers: Headers, ...custom: HeadersInit[]) {
  custom.forEach((rawHeaders) => {
    new Headers(rawHeaders).forEach((value, key) => {
      headers.append(key, value);
    });
  });

  return headers;
}
