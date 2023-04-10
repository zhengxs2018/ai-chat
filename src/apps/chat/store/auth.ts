import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { trySerialize, tryDeserialize } from '@/shared/client/json';

export type UserState = {
  name: string;
  bio: string;
};

function initialUserState(): UserState {
  const raw = tryDeserialize<UserState>(localStorage.getItem('user'));

  return {
    name: raw?.name || '阿森',
    bio: raw?.bio || '这个人很懒，什么都没有留下',
  };
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUserState(),
  },
  reducers: {
    setUser(state, action: PayloadAction<Partial<UserState>>) {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', trySerialize(state.user));
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
