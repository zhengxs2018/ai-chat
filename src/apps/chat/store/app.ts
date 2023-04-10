import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    addContactVisible: false,
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
      state.addContactVisible = true;
    },
    closeAddContactModel(state) {
      state.addContactVisible = false;
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
