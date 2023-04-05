export type OpenAICreateCompletionParameters = {
  model: string;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  prompt: string;
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

  if (res.error) {
    return Promise.reject(res.error);
  }

  return res;
}

export default {
  createCompletion,
};
