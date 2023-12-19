import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAccessToken } from '../../helpers/user.actions';

axios.defaults.baseURL = 'https://online-zoo-store-backend-web-service.onrender.com';

const dataAction = async (url, method, data, thunkAPI) => {
  try {
    const response = await axios.request({
      url,
      method,
      data,
      headers: method !== "GET" ? { Authorization: `Bearer ${getAccessToken()}` } : {},
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const getAllCards = createAsyncThunk('cards/fetchAllCards', async ({ 
  page, sortMethod, nameLike, minPrice, maxPrice, selected, notAvailable, urlCategory}, thunkAPI
) => {
  let url = `api/v1/products?pageNumber=${page || 1}`;

  if (selected) {
    selected.forEach((item) => {
      const { href, id } = item;
      id.forEach((idValue) => {
        url += `&${href}=${idValue}`;
      });
    });
  }
  if (urlCategory && urlCategory[0] !== "All") url += `&categoryId=${urlCategory[1]}`
  
  if (sortMethod) url += `&sort=${sortMethod}`;
  if (nameLike) url += `&nameLike=${nameLike}`;
  if (notAvailable) url += `&notAvailable=false`;
  if (minPrice) url += `&minPrice=${minPrice}`;
  if (maxPrice) url += `&maxPrice=${maxPrice}`;

  return dataAction(url, 'GET', thunkAPI);
});

export const getCardsFromOneCategory = createAsyncThunk('cards/fetchCardsFromOneCategory', async (categoryId, thunkAPI) => {
  return dataAction(`api/v1/products?categoryId=${categoryId}`, 'GET', thunkAPI);
});

export const getOnSale = createAsyncThunk('cards/fetchOnSale', async (_, thunkAPI) => {
  return dataAction('api/v1/products?onSale=true', 'GET', thunkAPI);
});

export const createCard = createAsyncThunk('cards/createCard', async (data, thunkAPI) => {
  return dataAction('api/v1/products', 'POST', data, thunkAPI);
});

export const updateCard = createAsyncThunk('cards/updateCard', async ({id, data}, thunkAPI) => {
  return dataAction(`api/v1/products/${id}`, 'PUT', data, thunkAPI);
});


export const deleteCard = createAsyncThunk('cards/deleteCardProducts', async (id, thunkAPI) => {
  return dataAction(`api/v1/products/${id}`, 'DELETE', thunkAPI);
});

export const addToFavorite = createAsyncThunk('favourites/addFavoriteCard', async (id, thunkAPI) => {
  return dataAction(`api/v1/${id}`, 'POST',  thunkAPI);
});

export const deleteFromFavorite = createAsyncThunk( 'favourites/deleteFavoriteCard', async (id, thunkAPI) => {
  return dataAction(`api/v1/${id}`, 'DELETE', thunkAPI);
});
