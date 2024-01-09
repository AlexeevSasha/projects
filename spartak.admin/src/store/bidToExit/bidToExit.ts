import { createSlice } from "@reduxjs/toolkit";
import { BidToExitEntity } from "common/interfaces/kids";
import { getBidToExitById, getBidToExitsByFilter } from "./bidToExitActionAsync";

export type BidToExitState = {
  isLoading: boolean;
  count: number;
  items?: BidToExitEntity[];
  entity?: BidToExitEntity;
};

export const bidToExitInitialState: BidToExitState = {
  isLoading: false,
  count: 0,
};

export const { actions: bidToExitActions, reducer: bidToExitReducer } = createSlice({
  name: "bidToExit",
  initialState: bidToExitInitialState,
  reducers: {
    resetEntity(state) {
      state.entity = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBidToExitsByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBidToExitsByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.items = payload.items;
        state.isLoading = false;
      })
      .addCase(getBidToExitsByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getBidToExitById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBidToExitById.fulfilled, (state, { payload }) => {
        state.entity = payload;
        state.isLoading = false;
      })
      .addCase(getBidToExitById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
