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
    try {
      // TODO 需要格式化错误
      const { error } = await response.json();
      return Promise.reject(new Error(error.message));
    } catch {
      return Promise.reject(new Error(response.statusText));
    }
  }

  return response.json();
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
