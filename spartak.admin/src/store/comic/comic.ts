import { createSlice } from "@reduxjs/toolkit";
import { ComicEntity } from "common/interfaces/kids";
import { SelectFieldOption } from "ui/SelectField";
import { getComicById, getComicsByFilter, getComicSeasonOptions } from "./comicActionAsync";
import i18n from "i18next";

export type ComicState = {
  isLoading: boolean;
  count: number;
  items?: ComicEntity[];
  entity?: ComicEntity;
  seasons: SelectFieldOption[];
};

export const ComicInitialState: ComicState = {
  isLoading: false,
  count: 0,
  seasons: [],
};

export const { actions: comicActions, reducer: comicReducer } = createSlice({
  name: "comic",
  initialState: ComicInitialState,
  reducers: {
    resetEntity(state) {
      state.entity = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComicsByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComicsByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.items = payload.items;
        state.isLoading = false;
      })
      .addCase(getComicsByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getComicById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComicById.fulfilled, (state, { payload }) => {
        state.entity = payload;
        state.isLoading = false;
      })
      .addCase(getComicById.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getComicSeasonOptions.fulfilled, (state, { payload }) => {
        const locale = i18n.language === "ru" ? "Ru" : "En";
        state.seasons = payload.map(({ Id, ComicSeasonName }) => ({ label: ComicSeasonName[locale], value: Id }));
        state.isLoading = false;
      });
  },
});
