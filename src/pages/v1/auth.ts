import type { APIRoute } from 'astro';

import { checkPass } from '@/shared/node/auth';
import { withLog } from '@/shared/node/middleware';

export const post: APIRoute = withLog(async ({ request, cookies }) => {
  const body = await request.json();
  const pass = body.pass as string;

  if (checkPass(pass)) {
    cookies.set('code', pass, {
      path: '/',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return new Response('{"code":0}');
  }

  return new Response('{"code":-1}');
});
