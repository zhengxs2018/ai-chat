import { OpenAiSDK } from '@ai-chat/openai/node';

const openai = OpenAiSDK.build({
  baseURL: import.meta.env.OPENAI_API_BASE_URL,
  headersInit: {
    Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY}`,
    'OpenAI-Organization': import.meta.env.OPENAI_API_ORG,
  },
});

export default openai;
