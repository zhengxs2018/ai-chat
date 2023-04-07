import { assignHeaders } from '@/shared/utils/http';

const BASE_URL = 'https://api.openai.com';

export type OpenAIApiConfiguration = {
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
  headersInit?: Record<string, string>;
};

export class OpenAIApiBuilder {
  baseURL: string;
  apiKey?: string | null;
  apiVersion: string;
  organization?: string | null;
  headersInit: Record<string, string>;

  constructor(config: OpenAIApiConfiguration) {
    this.baseURL = config.baseURL || BASE_URL;
    this.apiKey = config.apiKey;
    this.apiVersion = config.apiVersion || 'v1';
    this.organization = config.organization;
    this.headersInit = config.headersInit || {};
  }

  createChatCompletion(init: RequestInit): Promise<Response> {
    return this.json('chat/completions', init);
  }

  createCompletion(init: RequestInit): Promise<Response> {
    return this.json('completions', init);
  }

  createEdit(init: RequestInit): Promise<Response> {
    return this.json('edits', init);
  }

  createEmbedding(init: RequestInit): Promise<Response> {
    return this.json('embeddings', init);
  }

  createImage(init: RequestInit): Promise<Response> {
    return this.form('images/generations', init);
  }

  createImageEdit(init: RequestInit): Promise<Response> {
    return this.form('images/edits', init);
  }

  createImageVariation(init: RequestInit): Promise<Response> {
    return this.form('images/variations', init);
  }

  createModeration(init: RequestInit): Promise<Response> {
    return this.form('moderations', init);
  }

  createTranscription(init: RequestInit): Promise<Response> {
    return this.form('audio/transcriptions', init);
  }

  createTranslation(init: RequestInit): Promise<Response> {
    return this.form('audio/translations', init);
  }

  json(uri: string, init: RequestInit): Promise<Response> {
    const headers = this.createHeaders({
      'Content-Type': 'application/json',
    });

    return fetch(this.buildURL(uri), {
      ...init,
      method: 'POST',
      headers: assignHeaders(headers, init.headers),
    });
  }

  form(uri: string, init: RequestInit): Promise<Response> {
    const headers = this.createHeaders({
      'Content-Type': 'multipart/form-data',
    });

    return fetch(this.buildURL(uri), {
      ...init,
      method: 'POST',
      headers: assignHeaders(headers, init.headers),
    });
  }

  createHeaders(init: HeadersInit): Headers {
    const { apiKey, organization } = this;
    const headers = new Headers(this.headersInit);

    if (apiKey) {
      headers.set(`Authorization`, `Bearer ${apiKey}`);
    }

    if (organization) {
      headers.set(`OpenAI-Organization`, organization);
    }

    return assignHeaders(headers, init);
  }

  buildURL(uri: string, base?: string): URL {
    return new URL(`/${this.apiVersion}/${uri}`, base || this.baseURL);
  }

  static build(config: OpenAIApiConfiguration) {
    return new OpenAIApiBuilder(config);
  }
}
