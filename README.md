# [WIP] 2023 我们一起与 AI 对话

功能正在开发中。

## 屏幕截图

聊天界面

<img src="./imgs/chat.jpg" width="300px" /><img src="./imgs/chat-1.jpg" width="300px" />

自动补全

<img src="./imgs/note.jpg" width="300px" />

## 环境变量

| 名称                    | 用途                               | 是否必须 | 默认值                   |
| ----------------------- | ---------------------------------- | -------- | ------------------------ |
| OPENAI_API_BASE_URL     | 请求基础路径                       | 否       | https://closeai.deno.dev |
| OPENAI_API_ORG          | 在 OpenAI 注册获得的机构 ID        | 否       |                          |
| OPENAI_API_KEY          | 在 OpenAI 注册获得的 API Key       | 是       |                          |
| ANONYMOUS_USER_PASSWORD | 限制用户访问，不填为站点可公开访问 | 否       |                          |
| SUPER_USER_PASSWORD     | 可使用文本补全功能的用户           | 否       |                          |

## 如何部署

参考 Astro 的 [部署文档](https://docs.astro.build/en/guides/deploy/)。

## License

MIT
