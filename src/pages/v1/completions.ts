import type { APIRoute } from 'astro';
import { checkAuthPass, isSuperUser } from '@/shared/node/auth';
import openai from '@/shared/node/openai';

export const post: APIRoute = async ({ request, cookies }) => {
  const pass = cookies.get('code').value;

  if (checkAuthPass(pass) === false) {
    return new Response(
      JSON.stringify({ code: 401, message: '请登录后再试' }),
      {
        status: 401,
        statusText: 'Unauthorized',
      }
    );
  }

  const bypass =
    isSuperUser(pass) ||
    import.meta.env.DEV ||
    request.headers.has('Authorization');

  if (!bypass) {
    return new Response(
      JSON.stringify({ code: 401, message: '请使用自己的 API Key' }),
      {
        status: 401,
        statusText: 'Unauthorized',
      }
    );
  }

  return openai.post('/v1/completions', request);
};
