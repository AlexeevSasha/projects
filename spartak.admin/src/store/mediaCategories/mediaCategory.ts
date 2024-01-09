import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../common/interfaces/mediaCategory";
import { getCategoriesByFilters, getCategoryById } from "./mediaCategoryActionAsync";

export type MediaCategoriesState = {
  isLoading: boolean;
  count: number;
  categories?: Category[];
  category?: Category;
};

export const mediaCategoriesInitialState: MediaCategoriesState = {
  isLoading: false,
  count: 0,
};

export const { actions: mediaCategoryActions, reducer: mediaCategoryReducer } = createSlice({
  name: "mediaCategory",
  initialState: mediaCategoriesInitialState,
  reducers: {
    resetCategory(state) {
      state.category = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesByFilters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoriesByFilters.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.categories = payload.categories;
        state.isLoading = false;
      })
      .addCase(getCategoriesByFilters.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getCategoryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoryById.fulfilled, (state, { payload }) => {
        state.category = payload;
        state.isLoading = false;
      })
      .addCase(getCategoryById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
