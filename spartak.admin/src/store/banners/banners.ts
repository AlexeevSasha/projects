import { createSlice } from "@reduxjs/toolkit";
import { BannerEntity, BannerLocation } from "common/interfaces/banners";
import { getBanner, getBannerLocations, getBannersByFilter } from "./bannersActionAsync";

export type BannersState = {
  isLoading: boolean;
  count: number;
  bannersList?: BannerEntity[];
  banner?: BannerEntity;
  locations: BannerLocation[];
};

export const bannersInitialState: BannersState = {
  isLoading: false,
  count: 0,
  locations: [],
};

export const { actions: bannersActions, reducer: bannersReducer } = createSlice({
  name: "banners",
  initialState: bannersInitialState,
  reducers: {
    reset(state) {
      state.banner = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBannersByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBannersByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.bannersList = payload.banners;
        state.isLoading = false;
      })
      .addCase(getBannersByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBanner.fulfilled, (state, { payload }) => {
        state.banner = payload;
        state.isLoading = false;
      })
      .addCase(getBanner.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getBannerLocations.fulfilled, (state, { payload }) => {
        state.locations = payload;
      });
  },
});
