export function usePreferences() {
  const payload = {
    openai: {
      baseURL: 'https://ai-2023.deno.dev',
      apiVersion: 'v1',
      apiKey: '',
      organization: '',
      maxTokens: 126,
    },
    chat: {
      maxMessages: 100,
      useAssistantMessage: false,
    },
  };

  return [payload] as const;
}
