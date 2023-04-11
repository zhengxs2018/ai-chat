// copy from https://github.com/justjavac/openai-proxy/blob/main/main.ts
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { serve } from 'https://deno.land/std@0.181.0/http/server.ts';

const OPENAI_API_HOST = 'api.openai.com';

serve(async (request) => {
  const url = new URL(request.url);

  if (url.pathname === '/') {
    return fetch(new URL('./Readme.md', import.meta.url));
  }

  url.host = OPENAI_API_HOST;
  return await fetch(url, request);
});
