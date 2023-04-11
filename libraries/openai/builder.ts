import { assignHeaders } from '@ai-chat/shared/http';

const BASE_URL = 'https://api.openai.com';

export type OpenAiConfiguration = {
  /**
   * 基础路径
   *
   * @defaultValue 'https://api.openai.com'
   */
  baseURL?: string;

  /**
   * API 版本
   *
   * @defaultValue 'v1'
   */
  apiVersion?: string;

  /**
   * OpenAI 的 API Key
   *
   * @param name security name
   * @memberof Configuration
   */
  apiKey?: string;

  /**
   * OpenAI 的 机构ID
   */
  organization?: string;

  /**
   * 自定义请求头
   */
  headers?: Record<string, string>;
};

export class OpenAiBuilder {
  baseURL: string;
  apiKey?: string | null;
  apiVersion: string;
  organization?: string | null;
  headers: Record<string, string>;

  constructor(config: OpenAiConfiguration) {
    this.baseURL = config.baseURL || BASE_URL;
    this.apiKey = config.apiKey;
    this.apiVersion = config.apiVersion || 'v1';
    this.organization = config.organization;
    this.headers = config.headers || {};
  }

  createChatCompletion(body: BodyInit): Request {
    return this.createJsonRequest('chat/completions', body);
  }

  createCompletion(body: BodyInit): Request {
    return this.createJsonRequest('completions', body);
  }

  createEdit(body: BodyInit): Request {
    return this.createJsonRequest('edits', body);
  }

  createEmbedding(body: BodyInit): Request {
    return this.createJsonRequest('embeddings', body);
  }

  createImage(body: BodyInit): Request {
    return this.createFromRequest('images/generations', body);
  }

  createImageEdit(body: BodyInit): Request {
    return this.createFromRequest('images/edits', body);
  }

  createImageVariation(body: BodyInit): Request {
    return this.createFromRequest('images/variations', body);
  }

  createModeration(body: BodyInit): Request {
    return this.createFromRequest('moderations', body);
  }

  createTranscription(body: BodyInit): Request {
    return this.createFromRequest('audio/transcriptions', body);
  }

  createTranslation(body: BodyInit): Request {
    return this.createFromRequest('audio/translations', body);
  }

  createJsonRequest(uri: string, body: BodyInit): Request {
    return new Request(this.buildURL(uri), {
      method: 'POST',
      headers: this.createHeaders({
        'Content-Type': 'application/json',
      }),
      body,
    });
  }

  createFromRequest(uri: string, body: BodyInit): Request {
    return new Request(this.buildURL(uri), {
      method: 'POST',
      headers: this.createHeaders({
        'Content-Type': 'multipart/form-data',
      }),
      body,
    });
  }

  createHeaders(customHeaders: HeadersInit): Headers {
    const { apiKey, organization } = this;
    const headers = new Headers(this.headers);

    if (apiKey) {
      headers.set(`Authorization`, `Bearer ${apiKey}`);
    }

    if (organization) {
      headers.set(`OpenAI-Organization`, organization);
    }

    return assignHeaders(headers, customHeaders);
  }

  buildURL(uri: string, base?: string): URL {
    return new URL(`/${this.apiVersion}/${uri}`, base || this.baseURL);
  }

  static build(config: OpenAiConfiguration) {
    return new OpenAiBuilder(config);
  }
}
