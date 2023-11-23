import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://online-zoo-store-backend-web-service.onrender.com';

const dataAction = async (url, options, thunkAPI) => {
  try {
    const response = await axios.request({
      url,
      ...options,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const getAllUsers = createAsyncThunk('users/fetchAllUsers', async (thunkAPI) => {
  return dataAction(`api/v1/users`, { method: 'GET' }, thunkAPI);
}); 