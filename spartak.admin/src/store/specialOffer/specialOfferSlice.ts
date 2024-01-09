import { createSlice } from "@reduxjs/toolkit";
import { getSpecialOfferById, getSpecialOffersByFilter } from "./specialOfferActionAsync";
import { SpecialOfferRequest, UserLevel } from "../../common/interfaces/specialOffer";

export type SpecialOfferState = {
  isLoading: boolean;
  count: number;
  specialOffers?: SpecialOfferRequest[];
  specialOffer?: SpecialOfferRequest;
  userLevels?: UserLevel[];
};

export const specialOffersInitialState: SpecialOfferState = {
  isLoading: false,
  count: 0,
};

export const { actions: specialOffersActions, reducer: specialOffersReducer } = createSlice({
  name: "specialOffers",
  initialState: specialOffersInitialState,
  reducers: {
    resetSpecialOffer(state) {
      state.specialOffer = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSpecialOffersByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpecialOffersByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.specialOffers = payload.specialOffers;
        state.isLoading = false;
      })
      .addCase(getSpecialOffersByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getSpecialOfferById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpecialOfferById.fulfilled, (state, { payload }) => {
        state.specialOffer = payload;
        state.isLoading = false;
      })
      .addCase(getSpecialOfferById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
