import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';

const initialState = {
  user: { 
    name: null, 
    email: null, 
},
  id:null,
  token: null,
  isLoggedIn: false,
  error:null,
  isRefreshing: false,
};

// const handlePending = state => {
//   return state;
// };

// const handleRejected = (state, action) => {
//   state.isLoggedIn = false;
//   state.error = action.payload;
// };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) =>
    builder

      //*register
    .addCase(register.pending, (state, action)=>state)
    .addCase(register.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.error = action.payload;
    })
    .addCase(register.fulfilled, (state, action)=> {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    })

      //*logIn
    .addCase(logIn.pending, (state, action)=>state)
    .addCase(logIn.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.error = action.payload;
    })
    .addCase(logIn.fulfilled, (state, action)=>{
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    })

      //*logOut
    .addCase(logOut.pending, (state, action)=>state)
    .addCase(logOut.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.error = action.payload;
    })
    .addCase(logOut.fulfilled, (state)=> {
        //=== state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    })

      //*refreshUser
    .addCase(refreshUser.pending, (state)=>{
      state.isRefreshing = true;
    })
    .addCase(refreshUser.rejected, (state, action) => {
      state.isRefreshing = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    })
    .addCase(refreshUser.fulfilled, (state, action) =>{
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    })
});

export const authReducer = authSlice.reducer;