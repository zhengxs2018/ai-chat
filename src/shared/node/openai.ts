import { OpenAIApiBuilder } from '@/libraries/openai';

const openai = OpenAIApiBuilder.build({
  baseURL: import.meta.env.OPENAI_API_BASE_URL,
  headersInit: {
    Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY}`,
    'OpenAI-Organization': import.meta.env.OPENAI_API_ORG,
    // fix https://github.com/nodejs/node/issues/46221
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    duplex: 'half',
  },
});

export default openai;
