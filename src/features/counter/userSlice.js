import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  posts: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    addPost: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { login, logout, addPost } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectPosts = (state) => state.user.posts;

export default userSlice.reducer;
