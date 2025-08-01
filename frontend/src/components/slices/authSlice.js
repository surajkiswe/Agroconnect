import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fname: '',
  lname: '',
  username: '',
  userid: null,
  role: '',
  gid: null,       
  isLoggedIn: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { fname, lname, username, userid, role, gid } = action.payload;
      state.fname = fname;
      state.lname = lname;
      state.username = username;
      state.userid = userid;
      state.role = role;
      state.gid = gid;  
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.fname = '';
      state.lname = '';
      state.username = '';
      state.userid = null;
      state.role = '';
      state.gid = null; 
      state.isLoggedIn = false;
    }
  }
});
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
