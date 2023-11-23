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

export const getAllCards = createAsyncThunk('cards/fetchAllCards', async (pageNumber, thunkAPI) => {
  return dataAction(`api/v1/products?pageNumber=${pageNumber}`, { method: 'GET' }, thunkAPI);
});

export const getCardsFromOneCategory = createAsyncThunk('cards/fetchCardsFromOneCategory', async (categoryId, thunkAPI) => {
  return dataAction(`api/v1/products?categoryId=${categoryId}`, { method: 'GET' }, thunkAPI);
});

export const getOnSale = createAsyncThunk('cards/fetchOnSale', async (_, thunkAPI) => {
  return dataAction('api/v1/products?onSale=true', { method: 'GET' }, thunkAPI);
});

export const createCard = createAsyncThunk('cards/createCard', async (data, thunkAPI) => {
  return dataAction('api/v1/products', { method: 'POST', data: data }, thunkAPI);
});

export const updateCard = createAsyncThunk('cards/updateCard', async ({id, data}, thunkAPI) => {
  return dataAction(`api/v1/products/${id}`, { method: 'PUT', data: data }, thunkAPI);
});


export const deleteCard = createAsyncThunk('cards/deleteCardProducts', async (id, thunkAPI) => {
  return dataAction(`api/v1/products/${id}`, { method: 'DELETE' }, thunkAPI);
});

export const addToFavorite = createAsyncThunk('favourites/addFavoriteCard', async (id, thunkAPI) => {
  return dataAction(`api/v1/${id}`, { method: 'POST'},  thunkAPI);
});

export const deleteFromFavorite = createAsyncThunk( 'favourites/deleteFavoriteCard', async (id, thunkAPI) => {
  return dataAction(`api/v1/${id}`, { method: 'DELETE' }, thunkAPI);
});
