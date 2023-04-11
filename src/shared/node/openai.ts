import { OpenAiSDK } from '@ai-chat/openai/node';

const openai = OpenAiSDK.build({
  baseURL: import.meta.env.OPENAI_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY}`,
    'OpenAI-Organization': import.meta.env.OPENAI_ORGANIZATION || '',
  },
});

export default openai;
