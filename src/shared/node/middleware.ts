import type { APIContext, APIRoute } from 'astro';

import { checkPass, isSuperUser } from './auth';

export type Middleware = (
  next: (context: APIContext) => Response | Promise<Response>
) => APIRoute;

export const whenLogin: Middleware = (next) => {
  return (context) => {
    if (checkPass(context.cookies.get('code').value)) return next(context);

    return new Response(
      JSON.stringify({ code: 401, message: '请登录后使用' }),
      {
        status: 401,
        statusText: 'Unauthorized',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };
};

export const whenSuperUser: Middleware = (next) => {
  return (context) => {
    if (isSuperUser(context.cookies.get('code').value)) return next(context);

    return new Response(
      JSON.stringify({ code: 401, message: '只有高级用户才能使用' }),
      {
        status: 401,
        statusText: 'Unauthorized',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };
};

export const catchHttpError = (next) => (context) => {
  return Promise.resolve(next(context)).catch((ex) => {
    // eslint-disable-next-line no-console
    console.error(ex);
    return new Response(
      JSON.stringify({ code: ex.status, message: ex.message }),
      {
        status: ex.status || 500,
        statusText: ex.statusText || 'Internal Server Error',
      }
    );
  });
};
