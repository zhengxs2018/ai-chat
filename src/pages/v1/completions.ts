import type { APIRoute } from 'astro';
import { checkAuthFromCookies } from '@/shared/node/auth';
import openai from '@/shared/node/openai';

export const post: APIRoute = async ({ request, cookies }) => {
  if (checkAuthFromCookies(cookies) === false) {
    return new Response('{"code":401}', {
      status: 401,
      statusText: '请登录后再试',
    });
  }

  // TODO: 不开放此接口
  if (import.meta.env.PROD && !request.headers.has('Authorization')) {
    return new Response('{"code":401}', {
      status: 401,
      statusText: '请使用自己的 API Key',
    });
  }

  return openai.createCompletion(request);
};
