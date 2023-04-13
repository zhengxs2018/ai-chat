import { createParser } from 'eventsource-parser';

interface FetchSSEOptions extends RequestInit {
  onMessage(data: string): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError(error: any): void;
}

export async function fetchSSE(input: string, options: FetchSSEOptions) {
  const { onMessage, onError, ...fetchOptions } = options;

  const resp = await fetch(input, fetchOptions);
  if (resp.status !== 200) {
    onError(await resp.json());
    return;
  }
  const parser = createParser((event) => {
    if (event.type === 'event') {
      onMessage(event.data);
    }
  });
  const reader = resp.body.getReader();
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const str = new TextDecoder().decode(value);
      parser.feed(str);
    }
  } finally {
    reader.releaseLock();
  }
}
