import { OpenAIApiBuilder, OpenAIApiConfiguration } from './api';
import {
  CreateCompletionRequest,
  CreateCompletionResponse,
  CreateChatCompletionResponse,
  CreateChatCompletionRequest,
} from './types';

export class OpenAIClient {
  api: OpenAIApiBuilder;

  constructor(config: OpenAIApiConfiguration) {
    this.api = OpenAIApiBuilder.build(config);
  }

  async createCompletion(
    input: CreateCompletionRequest,
    init?: RequestInit
  ): Promise<CreateCompletionResponse> {
    const request = await this.api.createCompletion({
      ...init,
      body: JSON.stringify(input),
    });

    return transformResponse(request);
  }

  async createChatCompletion(
    input: CreateChatCompletionRequest,
    init?: RequestInit
  ): Promise<CreateChatCompletionResponse> {
    const request = await this.api.createChatCompletion({
      ...init,
      body: JSON.stringify(input),
    });

    return transformResponse(request);
  }
}

export async function transformResponse(response: Response) {
  if (response.ok) {
    const res = await response.json();
    const ex = res.error;

    return ex ? Promise.reject(new Error(ex.message || '请求失败')) : res;
  }

  return Promise.reject(new Error(response.statusText));
}
