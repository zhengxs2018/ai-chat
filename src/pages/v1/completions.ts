import type { APIRoute } from 'astro';

import openai from '@/shared/node/openai';
import {
  withLog,
  withHttpError,
  whenSuperUser,
} from '@/shared/node/middleware';

export const post: APIRoute = withHttpError(
  withLog(whenSuperUser(({ request }) => openai.createCompletion(request)))
);
