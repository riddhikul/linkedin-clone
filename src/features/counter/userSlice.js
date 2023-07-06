import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    posts: [],
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
  },
});

export const { login, logout, addPost } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectPosts = (state) => state.user.posts;

export default userSlice.reducer;
