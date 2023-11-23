import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from './operations';


const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isLoading: false,
    error: null,
  },

  extraReducers: builder => {
    builder

      //* статус "pending"
      .addCase(getAllUsers.pending, state => {
        state.isLoading = true;
      })

      //* статус "rejected"
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //* статус "fulfilled"
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
  }
});

export const usersReducer = usersSlice.reducer;