# [WIP] 2023 我们一起与 AI 对话

<a href="https://github.com/zhengxs2018/ai-chat/pulls" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs Welcome" />
</a>


功能正在开发中。

## 屏幕截图

密码界面

![密码界面](./imgs/password.png)

聊天界面

<img src="./imgs/chat.jpg" width="300px" /><img src="./imgs/chat-1.jpg" width="300px" />

自动补全

<img src="./imgs/note.jpg" width="300px" />

## 环境变量

| 名称                    | 用途                               | 是否必须 | 默认值                   |
| ----------------------- | ---------------------------------- | -------- | ------------------------ |
| OPENAI_API_BASE_URL     | 请求基础路径                       | 否       | https://closeai.deno.dev |
| OPENAI_ORGANIZATION     | 在 OpenAI 注册获得的机构 ID        | 否       |                          |
| OPENAI_API_KEY          | 在 OpenAI 注册获得的 API Key       | 是       |                          |
| USER_PASSWORD | 限制用户访问，不填为站点可公开访问 | 否       |                          |
| BAIDU_API_KEY           | 百度统计代码的 API KEY             | 否       |                          |

## 如何部署

参考 Astro 的 [部署文档](https://docs.astro.build/en/guides/deploy/)。

## 感谢

很多灵感来自以下开源项目，排名不分先后。

- [Chatgpt Vercel](https://github.com/ourongxing/chatgpt-vercel)
- [speechgpt](https://github.com/hahahumble/speechgpt)
- And more.

## License

MIT
