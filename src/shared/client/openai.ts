import { OpenAiClient } from '@ai-chat/openai/client';

const openai = new OpenAiClient({
  baseURL: window.location.origin,
});

export default openai;
