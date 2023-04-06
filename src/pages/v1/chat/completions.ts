import type { APIRoute } from 'astro';

import openai from '@/shared/node/openai';
import { catchHttpError, whenLogin } from '@/shared/node/middleware';

export const post: APIRoute = catchHttpError(
  whenLogin(async ({ request }) => {
    const response = await openai.createChatCompletion(request.body);

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
    });
  })
);
