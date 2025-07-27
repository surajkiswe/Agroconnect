import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  userid: null,
  role: '',
  isLoggedIn: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { username, userid, role } = action.payload;
      state.username = username;
      state.userid = userid;
      state.role = role;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.username = '';
      state.userid = null;
      state.role = '';
      state.isLoggedIn = false;
    }
  }
});


export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
