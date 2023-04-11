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
  };
  message: {
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
      maxTokens: 256,
      temperature: 0.7,
    },
    message: {
      maxMessages: 10,
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
    updateMessage(state, action: PayloadAction<PreferencesState['message']>) {
      const { payload } = action;

      state.message = { ...state.message, ...payload };
      localStorage.setItem('ai-chat-app:preferences', trySerialize(state));
    },
  },
});

export const { updateOpenAI, updateChat } = preferencesSlice.actions;

export default preferencesSlice.reducer;
