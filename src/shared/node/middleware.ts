/* eslint-disable no-console */
import type { APIContext, APIRoute } from 'astro';

import { checkPass, isSuperUser } from './auth';

import { humanize } from '../utils/number';

export type Middleware = (
  next: (context: APIContext) => ReturnType<APIRoute>
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

export const withLog: Middleware = (next) => {
  return (context) => {
    const start = new Date();
    const { url, method } = context.request;
    const { pathname } = new URL(url);

    console.log('%s <-- %s %s', start.toLocaleTimeString(), method, pathname);

    return Promise.resolve(next(context)).then(
      (response) => {
        const end = new Date();
        console.log(
          `%s --> %s %s %s %s`,
          end.toLocaleTimeString(),
          method,
          pathname,
          (response as Response).status,
          time(start, end)
        );
        return response;
      },
      (ex) => {
        const end = new Date();
        console.log(
          `%s xxx %s %s %s %s`,
          end.toLocaleTimeString(),
          method,
          pathname,
          500,
          time(start, end)
        );
        return Promise.reject(ex);
      }
    );
  };
};

export const withHttpError: Middleware = (next) => (context) => {
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

function time(start, end) {
  const delta = end - start;

  return humanize(
    delta < 10000 ? `${delta}ms` : `${Math.round(delta / 1000)}s`
  );
}
