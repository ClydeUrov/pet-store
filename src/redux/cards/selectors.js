import { createSelector } from "reselect";

export const selectCards = (state) => state.cards.items;
export const selectIsLoading = (state) => state.cards.isLoading;
export const selectError = (state) => state.cards.error;
export const selectOnSale = (state) => state.cards.onSale;
export const selectFavorites = (state) => state.cards.favorites;
export const selectCardsInCart = (state) => state.cards.cardsInCart;
export const selectAllCategories = (state) => state.cards.categories;

export const selectMainCategories = createSelector(
  selectAllCategories,
  (categories) => ({
    ...categories,
    content: [...new Set(categories.content.filter((e) => !e.parent))],
  })
);
export const selectBrands = (state) => state.cards.brands;

export const selectAllItems = (state) => state.cards;
