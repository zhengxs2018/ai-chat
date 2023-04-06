import type { APIRoute } from 'astro';

import openai from '@/shared/node/openai';
import { catchHttpError, whenSuperUser } from '@/shared/node/middleware';

export const post: APIRoute = catchHttpError(
  whenSuperUser(async ({ request }) => {
    const response = await openai.createCompletion(request.body);

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
    });
  })
);
