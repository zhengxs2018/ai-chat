import type { APIRoute } from 'astro';

import openai from '@/shared/node/openai';
import {
  withLog,
  withHttpError,
  whenSuperUser,
} from '@/shared/node/middleware';

export const post: APIRoute = withHttpError(
  withLog(
    whenSuperUser(({ request }) => {
      return openai.createCompletion({
        body: request.body,
        headers: {
          Accept: request.headers.get('Accept'),
          'Content-Type': request.headers.get('Content-Type'),
        },
      });
    })
  )
);
