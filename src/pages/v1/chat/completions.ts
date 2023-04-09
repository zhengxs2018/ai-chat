import type { APIRoute } from 'astro';

import openai from '@/shared/node/openai';
import { withHttpError, withLog, whenLogin } from '@/shared/node/middleware';

export const post: APIRoute = withHttpError(
  withLog(whenLogin(({ request }) => openai.createChatCompletion(request)))
);
