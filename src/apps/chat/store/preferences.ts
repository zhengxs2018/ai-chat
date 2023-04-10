import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultsDeep } from 'lodash-es';

import { trySerialize, tryDeserialize } from '@/shared/client/json';

export type PreferencesState = {
  openai: {
    enable: boolean;
    baseURL: string;
    apiVersion: string;
    apiKey: string;
    organization: string;
  };
  chat: {
    model: string;
    maxTokens: number;
    temperature: number;
    maxMessages: number;
    reportAssistantMessage: boolean;
  };
};

function initialState(): PreferencesState {
  const raw = tryDeserialize<PreferencesState>(
    localStorage.getItem('ai-chat-app:preferences')
  );

  return defaultsDeep(raw, {
    openai: {
      enable: false,
      baseURL: '',
      apiVersion: '',
      apiKey: '',
      organization: '',
    },
    chat: {
      model: 'gpt-3.5-turbo',
      maxTokens: 1024,
      maxMessages: 10,
      temperature: 0.7,
      reportAssistantMessage: true,
    },
  });
}

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: initialState(),
  reducers: {
    updateOpenAI(state, action: PayloadAction<PreferencesState['openai']>) {
      const { payload } = action;

      state.openai = { ...state.openai, ...payload };
      localStorage.setItem('ai-chat-app:preferences', trySerialize(state));
    },
    updateChat(state, action: PayloadAction<PreferencesState['chat']>) {
      const { payload } = action;

      state.chat = { ...state.chat, ...payload };
      localStorage.setItem('ai-chat-app:preferences', trySerialize(state));
    },
  },
});

export const { updateOpenAI, updateChat } = preferencesSlice.actions;

export default preferencesSlice.reducer;
