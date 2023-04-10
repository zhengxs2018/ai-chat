import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    userPopupVisible: false,
  },
  reducers: {
    openUserPopup(state) {
      state.userPopupVisible = true;
    },
    closeUserPopup(state) {
      state.userPopupVisible = false;
    },
  },
});

export const { openUserPopup, closeUserPopup } = appSlice.actions;

export default appSlice.reducer;
