export type OpenAICompletionParameters = {
  model: string;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  n?: number;
  stop?: string[] | null;
  frequency_penalty?: number;
  presence_penalty?: number;
  use?: string;
};

// see https://platform.openai.com/docs/api-reference/completions/create
export type OpenAICreateCompletionParameters = OpenAICompletionParameters & {
  prompt: string;
};

export type OpenAIChatRoleType = 'user' | 'assistant' | 'system';

export type OpenAIChatMessage = {
  role: OpenAIChatRoleType;
  content: string;
};

// see https://platform.openai.com/docs/api-reference/chat/create
export type OpenAICreateChatParameters = OpenAICompletionParameters & {
  messages: OpenAIChatMessage[];
};

async function createCompletion(
  body: OpenAICreateCompletionParameters,
  init?: RequestInit
) {
  const response = await fetch('/v1/completions', {
    ...init,
    method: 'POST',
    body: JSON.stringify(body),
  });

  const res = await response.json();

  return res.error ? Promise.reject(res.error) : res;
}

async function createChatCompletion(
  body: OpenAICreateChatParameters,
  init?: RequestInit
) {
  const response = await fetch('/v1/chat/completions', {
    ...init,
    method: 'POST',
    body: JSON.stringify(body),
  });

  const res = await response.json();

  return res.error ? Promise.reject(res.error) : res;
}

export default {
  createCompletion,
  createChatCompletion,
};
