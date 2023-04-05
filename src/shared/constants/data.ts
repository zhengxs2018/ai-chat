export type SiteData = {
  /**
   * 站点语言
   */
  lang: string;
  /**
   * 站点标题
   */
  title: string;
  /**
   * 站点描述
   */
  description?: string;
  /**
   * 站点关键词
   */
  keywords?: string;
};

export const SITE_DATA: SiteData = {
  lang: import.meta.env.SITE_LANG || 'zh-CN',
  title: import.meta.env.SITE_TITLE || '与 AI 对话',
  description: import.meta.env.SITE_DESCRIPTION || '一个与 AI 聊天的应用',
  keywords:
    import.meta.env.SITE_KEYWORDS ||
    'ai,api,openai,chatgpt,gpt-3,gpt-3.5-turbo,对话,聊天',
};
