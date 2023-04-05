import { tryRequest } from './http';

const baseURL =
  import.meta.env.OPENAI_API_BASE_URL || 'https://closeai.deno.dev';

function copyRequestHeaders(rawRequest: Headers) {
  const headers = new Headers();

  headers.set('content-type', 'application/json');

  // Set authorization headers
  if (rawRequest.has('authorization')) {
    headers.set('authorization', rawRequest.get('authorization') || '');
    headers.set(
      'openai-organization',
      rawRequest.get('openai-organization') || ''
    );
  } else {
    headers.set('authorization', `Bearer ${import.meta.env.OPENAI_API_KEY}`);
    headers.set('openai-organization', import.meta.env.OPENAI_API_ORG);
  }

  return headers;
}

function sendRequest(path: string, init: RequestInit) {
  return tryRequest(() => fetch(new URL(path, baseURL), init));
}

export default {
  getModels(req: Request) {
    return sendRequest('/v1/models', {
      method: 'GET',
      headers: copyRequestHeaders(req.headers),
    });
  },
  async createCompletion(req: Request) {
    return sendRequest('/v1/completions', {
      method: 'POST',
      headers: copyRequestHeaders(req.headers),
      body: req.body,
      // fix https://github.com/nodejs/node/issues/46221
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      duplex: 'half',
    });
  },
  post(path: string, req: Request) {
    return sendRequest(path, {
      method: 'POST',
      headers: copyRequestHeaders(req.headers),
      body: req.body,
      // fix https://github.com/nodejs/node/issues/46221
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      duplex: 'half',
    });
  },
};
