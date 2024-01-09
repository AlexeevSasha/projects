import { createSlice } from "@reduxjs/toolkit";
import { Stadium } from "common/interfaces/stadiums";
import { getStadiumById, getStadiumsByFilter } from "./dirStadiumActionAsync";

export type DirStadiumsState = {
  isLoading: boolean;
  count: number;
  stadiums?: Stadium[];
  stadium?: Stadium;
};

export const dirStadiumsInitialState: DirStadiumsState = {
  isLoading: false,
  count: 0,
};

export const { actions: dirStadiumsActions, reducer: dirStadiumsReducer } = createSlice({
  name: "dirStadiums",
  initialState: dirStadiumsInitialState,
  reducers: {
    resetStadium(state) {
      state.stadium = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStadiumsByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStadiumsByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.stadiums = payload.stadiums;
        state.isLoading = false;
      })
      .addCase(getStadiumsByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getStadiumById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStadiumById.fulfilled, (state, { payload }) => {
        state.stadium = payload;
        state.isLoading = false;
      })
      .addCase(getStadiumById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
