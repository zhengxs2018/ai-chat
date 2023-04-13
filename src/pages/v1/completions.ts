import type { APIRoute } from 'astro';

import openai from '@/shared/node/openai';
import {
  withLog,
  withHttpError,
  whenSuperUser,
} from '@/shared/node/middleware';

export const post: APIRoute = withHttpError(
  withLog(
    whenSuperUser(async ({ request }) => {
      const response = await openai.createCompletion(request.body);

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        // TODO 直接透传 Headers 会响应失败？
        headers: {
          'content-type': response.headers.get('content-type'),
        },
      });
    })
  )
);
