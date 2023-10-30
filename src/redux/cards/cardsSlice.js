import { createSlice } from '@reduxjs/toolkit';
import {
  getAllCards,
  getCardsFromOneCategory,
  addCard,
  deleteCard,
  getOnSale,

  addToFavorite,
  deleteFromFavorite,

} from './operations';

//import { logOut } from "../auth/operations";

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    items: [],
    onSale: [],
    favorites: [],
    cardsInCart:[],
    isLoading: false,
    error: null,
  },


  reducers: {
    filterFavorites: (state, action) => {
      state.favorites = state.favorites.filter(favorite =>
        favorite.id.includes(action.payload)
      );
    },
  
  },


  extraReducers: builder =>
    builder

      //* статус "pending"
      .addCase(getAllCards.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCardsFromOneCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(addCard.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteCard.pending, state => {
        state.isLoading = true;
      })
      .addCase(getOnSale.pending, state => {
        state.isLoading = true;
      })
     
      .addCase(addToFavorite.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteFromFavorite.pending, state => {
        state.isLoading = true;
      })


      //* статус "rejected"
      .addCase(getAllCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCardsFromOneCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getOnSale.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addToFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteFromFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //* статус "fulfilled"
      .addCase(getAllCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(getCardsFromOneCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(item => item._id !== action.meta.arg);
      })
       .addCase(getOnSale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.onSale = action.payload;
      })
      
      .addCase(addToFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.favorites.push(action.payload);
      })
      .addCase(deleteFromFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.favorites = state.favorites.filter(
          favorite => favorite._id !== action.meta.arg
        );
      }),


  //  .addCase(logOut.fulfilled, (state, action) => {
  //      state.items = [];
  //      state.onSale = [];
  //      state.favorites = [];
  //      cardsInCart:[];
  //      state.error = null;
  //      state.isLoading = false;
  //     }),
});


export const { filterFavorites } = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
