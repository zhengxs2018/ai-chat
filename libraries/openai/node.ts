import { overrideHeaders } from '@ai-chat/shared/http';

import { OpenAiBuilder, OpenAiConfiguration } from './builder';

export class OpenAiSDK {
  builder: OpenAiBuilder;

  constructor(config: OpenAiConfiguration) {
    this.builder = OpenAiBuilder.build(config);
  }

  async createCompletion(body: BodyInit, headers?: Headers): Promise<Response> {
    const request = await this.builder.createCompletion(body);

    // 允许客户端覆盖掉服务端的请求头
    overrideHeaders(
      request.headers,
      headers,
      'accept',
      'content-type',
      'authorization',
      'openai-organization'
    );

    return this.fetch(request);
  }

  async createChatCompletion(
    body: BodyInit,
    headers?: Headers
  ): Promise<Response> {
    const request = await this.builder.createChatCompletion(body);

    // 允许客户端覆盖掉服务端的请求头
    overrideHeaders(
      request.headers,
      headers,
      'accept',
      'content-type',
      'authorization',
      'openai-organization'
    );

    return this.fetch(request);
  }

  fetch(request: Request): Promise<Response> {
    return fetch(request, {
      // fix https://github.com/nodejs/node/issues/46221
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      duplex: 'half',
    });
  }

  static build(config: OpenAiConfiguration) {
    return new OpenAiSDK(config);
  }
}
