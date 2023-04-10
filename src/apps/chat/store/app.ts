import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    userProfilePopupVisible: false,
    addAssistantVisible: false,
  },
  reducers: {
    openUserPopup(state) {
      state.userProfilePopupVisible = true;
    },
    closeUserPopup(state) {
      state.userProfilePopupVisible = false;
    },
    openAddAssistantsPopup(state) {
      state.addAssistantVisible = true;
    },
    closeAddContactModel(state) {
      state.addAssistantVisible = false;
    },
  },
});

export const {
  openUserPopup,
  closeUserPopup,
  openAddAssistantsPopup,
  closeAddContactModel,
} = appSlice.actions;

export default appSlice.reducer;
