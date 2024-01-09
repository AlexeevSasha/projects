import { createSlice } from "@reduxjs/toolkit";
import { ComicSessonEntity } from "common/interfaces/kids";
import { getComicSeasonById, getComicSeasonsByFilter } from "./comicSeasonsActionAsync";

export type ComicSeasonsState = {
  isLoading: boolean;
  count: number;
  items?: ComicSessonEntity[];
  entity?: ComicSessonEntity;
};

export const comicSeasonsInitialState: ComicSeasonsState = {
  isLoading: false,
  count: 0,
};

export const { actions: comicSeasonsActions, reducer: comicSeasonsReducer } = createSlice({
  name: "comicSeasons",
  initialState: comicSeasonsInitialState,
  reducers: {
    resetEntity(state) {
      state.entity = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComicSeasonsByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComicSeasonsByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.items = payload.items;
        state.isLoading = false;
      })
      .addCase(getComicSeasonsByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getComicSeasonById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComicSeasonById.fulfilled, (state, { payload }) => {
        state.entity = payload;
        state.isLoading = false;
      })
      .addCase(getComicSeasonById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
