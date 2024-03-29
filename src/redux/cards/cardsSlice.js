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
  getAllCategories,
  getBrands,
} from "./operations";

//import { logOut } from "../auth/operations";

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    items: [],
    onSale: {
      content: [],
      isLoading: false,
    },
    favorites: [],
    cardsInCart: [],
    isLoading: false,
    error: null,
    categories: {
      content: [],
      isLoading: false,
    },
    brands: {
      content: [],
      isLoading: false,
    },
  },

  reducers: {
    filterFavorites: (state, action) => {
      state.favorites = state.favorites.filter((favorite) =>
        favorite.id.includes(action.payload)
      );
    },
    getProductById: (state, action) => {
      const productId = action.payload;
      const product = state.items.find((item) => item.id === productId);
      state.selectedProduct = product;
    },
  },

  extraReducers: (builder) =>
    builder

      //* статус "pending"
      .addCase(getAllCards.pending, (state) => {
        state.isLoading = true;
        console.log("action.pending");
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
        state.onSale.isLoading = true;
      })
      .addCase(addToFavorite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFromFavorite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.pending, (state) => {
        state.categories.isLoading = true;
      })
      .addCase(getBrands.pending, (state) => {
        state.brands.isLoading = true;
      })

      //* статус "rejected"
      .addCase(getAllCards.rejected, (state, action) => {
        console.log("action.rejected", action);
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
        state.onSale.isLoading = false;
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
      .addCase(getAllCategories.rejected, (state, action) => {
        state.categories.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.brands.isLoading = false;
        state.error = action.payload;
      })

      //* статус "fulfilled"
      .addCase(getAllCards.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
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
          state.items[updatedCardIndex] = action.payload;
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
        state.error = null;
        state.onSale = action.payload;
        state.onSale.isLoading = false;
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
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories.isLoading = false;
        state.error = null;
        state.categories.content = action.payload;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.brands.isLoading = false;
        state.error = null;
        state.brands.content = action.payload;
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

export const { filterFavorites, getProductById } = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
