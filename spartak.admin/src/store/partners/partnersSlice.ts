import { createSlice } from "@reduxjs/toolkit";
import { Partner } from "common/interfaces/partners";
import { getPartner, getPartners } from "./partnersActionAsync";

export type PartnersState = {
  isLoading: boolean;
  count: number;
  partners?: Partner[];
  partner?: Partner;
};

export const partnersInitialState: PartnersState = {
  isLoading: false,
  count: 0,
};

export const { actions: partnersActions, reducer: partnersReducer } = createSlice({
  name: "partners",
  initialState: partnersInitialState,
  reducers: {
    resetPartner(state) {
      state.partner = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPartners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPartners.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.partners = payload.partners;
        state.isLoading = false;
      })
      .addCase(getPartners.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getPartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPartner.fulfilled, (state, { payload }) => {
        state.partner = payload;
        state.isLoading = false;
      })
      .addCase(getPartner.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
