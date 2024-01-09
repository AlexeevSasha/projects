import { EventItem, MatchingItem, WinlineCoefficientItem } from "../../common/interfaces/matching";
import { createSlice } from "@reduxjs/toolkit";
import {
  getMatchingById,
  getMatchingEvents,
  getMatchingListByFilter,
  getMatchingWinlineCoefficient,
} from "./matchingActionAsync";

export type MatchingState = {
  isLoading: boolean;
  count: number;
  matchingList?: MatchingItem[];
  matching?: MatchingItem;
  events?: EventItem[];
  coefficients?: WinlineCoefficientItem[];
};

export const matchingInitialState: MatchingState = {
  isLoading: false,
  count: 0,
};

export const { actions: matchingActions, reducer: matchingReducer } = createSlice({
  name: "matching",
  initialState: matchingInitialState,
  reducers: {
    resetMatching(state) {
      state.matching = undefined;
    },
    resetCoefficients(state) {
      state.coefficients = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMatchingListByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMatchingListByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.matchingList = payload.items;
        state.isLoading = false;
      })
      .addCase(getMatchingListByFilter.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMatchingById.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getMatchingById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.matching = payload;
      })
      .addCase(getMatchingById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMatchingEvents.fulfilled, (state, { payload }) => {
        state.events = payload;
      })
      .addCase(getMatchingWinlineCoefficient.fulfilled, (state, { payload }) => {
        state.coefficients = payload;
      });
  },
});
