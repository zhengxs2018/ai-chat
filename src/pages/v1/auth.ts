import type { APIRoute } from 'astro';
import { checkAuthPass } from '@/shared/node/auth';

export const post: APIRoute = async ({ request, cookies }) => {
  const body = await request.json();
  const pass = body.pass as string;

  if (checkAuthPass(pass)) {
    cookies.set('code', pass, {
      path: '/',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return new Response('{"code":0}');
  }

  return new Response('{"code":-1}');
};
