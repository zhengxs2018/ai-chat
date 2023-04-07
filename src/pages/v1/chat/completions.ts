import type { APIRoute } from 'astro';

import openai from '@/shared/node/openai';
import { withHttpError, withLog, whenLogin } from '@/shared/node/middleware';

export const post: APIRoute = withHttpError(
  withLog(
    whenLogin(async ({ request }) => {
      return openai.createChatCompletion({
        body: request.body,
        headers: {
          Accept: request.headers.get('Accept'),
          'Content-Type': request.headers.get('Content-Type'),
        },
      });
    })
  )
);
