import type { APIRoute } from 'astro';

export const get: APIRoute = async ({ cookies }) => {
  cookies.delete('code', {
    path: '/',
  });
  return new Response('ok', { status: 200 });
};
