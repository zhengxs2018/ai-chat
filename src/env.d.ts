/// <reference types="astro/client" />

interface ImportMetaEnv {
  /**
   *  OpenAI API Base URL.
   */
  readonly OPENAI_API_BASE_URL: string;
  /**
   * OpenAI API key.
   */
  readonly OPENAI_API_KEY: string;
  /**
   * OpenAI API organization.
   */
  readonly OPENAI_ORGANIZATION: string;
  /**
   * Website language.
   */
  readonly SITE_LANG: string;
  /**
   * Website title.
   */
  readonly SITE_TITLE: string;
  /**
   * Website description.
   */
  readonly SITE_DESCRIPTION: string;
  /**
   * Website keywords.
   */
  readonly SITE_KEYWORDS: string;
  /**
   * Baidu API key.
   */
  readonly BAIDU_API_KEY: string;
  /**
   * User password.
   */
  readonly USER_PASSWORD: string;
  /**
   * Super user password.
   */
  readonly SUPER_USER_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
