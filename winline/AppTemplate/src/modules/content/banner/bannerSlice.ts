import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBanner } from "../../../api/dto/content/IBanner";
import { addBannerThunk, deleteBannerThunk, getAllBannersThunk, updateBannerThunk } from "./bannerActionAsync";

export const bannerAdapter = createEntityAdapter<IBanner>({
  selectId: (banner) => banner.id
});

export const bannerSlice = createSlice({
  name: "banner",
  initialState: bannerAdapter.getInitialState<{
    isLoading: boolean;
    count: number;
    disabledResetFilters: boolean;
  }>({
    count: 0,
    isLoading: false,
    disabledResetFilters: false
  }),
  reducers: {},
  extraReducers: {
    [getAllBannersThunk.pending.type]: (state) => {
      state.isLoading = true;
      state.disabledResetFilters = true;
    },
    [getAllBannersThunk.fulfilled.type]: (state, { payload }: PayloadAction<{ allBanners: IBanner[]; count: number }>) => {
      state.count = payload.count;
      bannerAdapter.setAll(state, payload.allBanners);
      state.isLoading = false;
      state.disabledResetFilters = false;
    },
    [getAllBannersThunk.rejected.type]: (state) => {
      state.isLoading = false;
      state.disabledResetFilters = false;
    },
    [addBannerThunk.pending.type]: (state) => {
      state.isLoading = true;
      state.disabledResetFilters = true;
    },
    [addBannerThunk.fulfilled.type]: (state, { payload }: PayloadAction<IBanner>) => {
      state.isLoading = false;
      state.count += 1;
      state.ids.unshift(payload.id);
      state.entities[payload.id] = payload;
    },
    [addBannerThunk.rejected.type]: (state) => {
      state.isLoading = false;
      state.disabledResetFilters = false;
    },
    [updateBannerThunk.pending.type]: (state) => {
      state.isLoading = true;
      state.disabledResetFilters = true;
    },
    [updateBannerThunk.fulfilled.type]: (state, { payload }: PayloadAction<IBanner>) => {
      bannerAdapter.updateOne(state, { id: payload.id, changes: payload });
      state.isLoading = false;
    },
    [updateBannerThunk.rejected.type]: (state) => {
      state.isLoading = false;
      state.disabledResetFilters = false;
    },
    [deleteBannerThunk.pending.type]: (state) => {
      state.isLoading = true;
      state.disabledResetFilters = true;
    },
    [deleteBannerThunk.fulfilled.type]: (state, { payload }: PayloadAction<number>) => {
      bannerAdapter.removeOne(state, payload);
      state.isLoading = false;
      state.disabledResetFilters = false;
      state.count -= 1;
    },
    [deleteBannerThunk.rejected.type]: (state) => {
      state.isLoading = false;
      state.disabledResetFilters = false;
    }
  }
});
