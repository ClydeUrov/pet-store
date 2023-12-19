import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCards,
  getCardsFromOneCategory,
  createCard,
  updateCard,
  deleteCard,
  getOnSale,
  addToFavorite,
  deleteFromFavorite,
} from "./operations";

//import { logOut } from "../auth/operations";

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    items: [],
    onSale: [],
    favorites: [],
    cardsInCart: [],
    isLoading: false,
    error: null,
    //categories:[],
    // brands:[]
  },

  reducers: {
    filterFavorites: (state, action) => {
      state.favorites = state.favorites.filter((favorite) =>
        favorite.id.includes(action.payload)
      );
    },
  },

  extraReducers: (builder) =>
    builder

      //* статус "pending"
      .addCase(getAllCards.pending, (state) => {
        console.log(11);
        state.isLoading = true;
      })
      .addCase(getCardsFromOneCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOnSale.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToFavorite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFromFavorite.pending, (state) => {
        state.isLoading = true;
      })

      //* статус "rejected"
      .addCase(getAllCards.rejected, (state, action) => {
        console.log(22, action.payload);
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCardsFromOneCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateCard.rejected, (state, action) => {
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
      .addCase(createCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.content.push(action.payload);
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const updatedCardIndex = state.items.content.findIndex(
          (card) => card.id === action.payload.id
        );
        if (updatedCardIndex !== -1) {
          state.items[updatedCardIndex] = action.payload; // Update the card in the items array
        }
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        if (state.items[action.meta.arg]) {
          delete state.items[action.meta.arg];
        }
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
          (favorite) => favorite._id !== action.meta.arg
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
