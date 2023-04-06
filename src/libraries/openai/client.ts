import { OpenAIApiBuilder } from './api';
import {
  Configuration,
  CreateCompletionRequest,
  CreateCompletionResponse,
  CreateChatCompletionResponse,
  CreateChatCompletionRequest,
} from './types';

async function transformResponse(response: Response) {
  if (response.ok) {
    const res = await response.json();
    const ex = res.error;

    return ex ? Promise.reject(new Error(ex.message || '请求失败')) : res;
  }

  return Promise.reject(new Error(response.statusText));
}

export class OpenAIApiClient {
  api: OpenAIApiBuilder;

  constructor(config: Configuration) {
    this.api = OpenAIApiBuilder.build(config);
  }

  async createCompletion(
    body: CreateCompletionRequest
  ): Promise<CreateCompletionResponse> {
    return transformResponse(await this.api.createCompletion(body, true));
  }

  async createChatCompletion(
    body: CreateChatCompletionRequest
  ): Promise<CreateChatCompletionResponse> {
    return transformResponse(await this.api.createChatCompletion(body, true));
  }

  static builder(configuration?: Configuration) {
    return new OpenAIApiClient({
      baseURL: `${window.location.origin}/v1`,
      ...configuration,
    });
  }
}
