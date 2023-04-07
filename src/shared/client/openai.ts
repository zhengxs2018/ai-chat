import { OpenAIClient } from '@/libraries/openai';

const openai = new OpenAIClient({
  baseURL: window.location.origin,
});

export default openai;
