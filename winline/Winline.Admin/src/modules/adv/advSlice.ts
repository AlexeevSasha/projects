import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBannerThunk, deleteBannerThunk, getBannersThunk, updateBannerThunk } from "./advActionAsync";
import type { IAdv } from "../../api/dto/adv/IAdv";

export interface IAdvState {
  isLoading: boolean;
  count: number;
}

export const advAdapter = createEntityAdapter<IAdv>();

export const advSlice = createSlice({
  name: "adv",
  initialState: advAdapter.getInitialState<IAdvState>({
    isLoading: false,
    count: 0
  }),
  reducers: {},
  extraReducers: {
    [getBannersThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getBannersThunk.fulfilled.type]: (state, { payload }: PayloadAction<{ data: IAdv[]; count: number }>) => {
      state.count = payload.count;
      advAdapter.setAll(state, payload.data);
      state.isLoading = false;
    },
    [getBannersThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [createBannerThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createBannerThunk.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.count += 1;
    },
    [createBannerThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [updateBannerThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateBannerThunk.fulfilled.type]: (state, { payload }: PayloadAction<IAdv>) => {
      advAdapter.updateOne(state, { id: payload.id, changes: payload });
      state.isLoading = false;
    },
    [updateBannerThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [deleteBannerThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteBannerThunk.fulfilled.type]: (state, { payload }: PayloadAction<number>) => {
      advAdapter.removeOne(state, payload);
      state.isLoading = false;
      state.count -= 1;
    },
    [deleteBannerThunk.rejected.type]: (state) => {
      state.isLoading = false;
    }
  }
});
