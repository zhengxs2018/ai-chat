import type { APIRoute } from 'astro';
import { checkAuthPass } from '@/shared/node/auth';
import openai from '@/shared/node/openai';

export const post: APIRoute = async ({ request, cookies }) => {
  if (checkAuthPass(cookies.get('code').value) === false) {
    return new Response(
      JSON.stringify({ code: 401, message: '请登录后再试' }),
      {
        status: 401,
        statusText: 'Unauthorized',
      }
    );
  }

  return openai.post('/v1/chat/completions', request);
};
