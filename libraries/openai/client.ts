import { isInvalidStatus } from '@ai-chat/shared/http';
import { OpenAiBuilder, OpenAiConfiguration } from './builder';
import type {
  CreateCompletionRequest,
  CreateCompletionResponse,
  CreateChatCompletionResponse,
  CreateChatCompletionRequest,
} from './openai';

async function transformResponse<T>(response: Response): Promise<T> {
  if (!response.ok || isInvalidStatus(response.status)) {
    return Promise.reject(new Error(response.statusText));
  }

  const res = await response.json();
  const ex = res.error;

  return ex ? Promise.reject(new Error(ex.message || '请求失败')) : res;
}

export class OpenAiClient {
  builder: OpenAiBuilder;

  constructor(config: OpenAiConfiguration) {
    this.builder = OpenAiBuilder.build(config);
  }

  async createCompletion(
    input: CreateCompletionRequest,
    init?: RequestInit
  ): Promise<CreateCompletionResponse> {
    const request = await this.builder.createCompletion(JSON.stringify(input));
    return transformResponse(await fetch(request, init));
  }

  async createChatCompletion(
    input: CreateChatCompletionRequest,
    init?: RequestInit
  ): Promise<CreateChatCompletionResponse> {
    const request = await this.builder.createChatCompletion(
      JSON.stringify(input)
    );
    return transformResponse(await fetch(request, init));
  }
}
