import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    addAssistantVisible: false,
    userProfileVisible: false,
    preferencesVisible: false,
  },
  reducers: {
    openUserPopup(state) {
      state.userProfileVisible = true;
    },
    closeUserPopup(state) {
      state.userProfileVisible = false;
    },
    openAddAssistantsPopup(state) {
      state.addAssistantVisible = true;
    },
    closeAddContactModel(state) {
      state.addAssistantVisible = false;
    },
    openPreferencesPopup(state) {
      state.preferencesVisible = true;
    },
    closePreferencesPopup(state) {
      state.preferencesVisible = false;
    },
  },
});

export const {
  openUserPopup,
  closeUserPopup,
  openAddAssistantsPopup,
  closeAddContactModel,
  openPreferencesPopup,
  closePreferencesPopup,
} = appSlice.actions;

export default appSlice.reducer;
