import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://online-zoo-store-backend-web-service.onrender.com';

export const getAllCards = createAsyncThunk(
  'cards/fetchAllCards',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `api/v1/products`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCardsFromOneCategory = createAsyncThunk(
  'cards/fetchCardsFromOneCategory',
  async (categoryId, thunkAPI) => {
    try {
      const response = await axios.get(
        `api/v1/products?categoryId=${categoryId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getOnSale = createAsyncThunk(
  'cards/fetchOnSale',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`api/v1/products?onSale=true`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
); 


//=== на майбутнє

export const addCard = createAsyncThunk(
  'cards/addCard',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post('api', data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCard = createAsyncThunk(
  'cards/deleteCardProducts',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`api/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addToFavorite = createAsyncThunk(
  'favourites/addFavoriteCard',
  async (id, thunkAPI) => {
    try {
      const response = await axios.post(`api/v1//${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteFromFavorite = createAsyncThunk(
  'favourites/deleteFavoriteCard',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`api/v1//${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
