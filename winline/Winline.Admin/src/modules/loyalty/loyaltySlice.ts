import { createSlice, createEntityAdapter, PayloadAction } from "@reduxjs/toolkit";
import { ISelect } from "../../api/dto/ISelect";
import { IEvents, ILoyalty, ISectors } from "../../api/dto/loyalty/ILoyalty";
import {
  addLoyaltyThunk,
  deleteLoyaltyThunk,
  endLoyaltyThunk,
  getAllLoyalties,
  getEventsThunk,
  getLoyaltyTypeThunk,
  getSectorsThunk,
  updateLoyaltyThunk
} from "./loyaltyActionAsync";

export const loyaltyAdapter = createEntityAdapter<ILoyalty>();

export const loyaltySlice = createSlice({
  name: "loyalty",
  initialState: loyaltyAdapter.getInitialState<{
    isLoading: boolean;
    type: string[];
    events: IEvents[];
    sectors: ISectors[];
    count: number;
  }>({
    isLoading: false,
    type: [],
    events: [],
    sectors: [],
    count: 0
  }),
  reducers: {},
  extraReducers: {
    [getAllLoyalties.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllLoyalties.fulfilled.type]: (state, { payload }: PayloadAction<{ data: ILoyalty[]; count: number }>) => {
      loyaltyAdapter.setAll(state, payload.data);
      state.count = payload.count;
      state.isLoading = false;
    },
    [getAllLoyalties.rejected.type]: (state) => {
      state.isLoading = true;
    },

    [getLoyaltyTypeThunk.fulfilled.type]: (state, { payload }: PayloadAction<string[]>) => {
      state.type = payload;
    },
    [getEventsThunk.fulfilled.type]: (state, { payload }: PayloadAction<IEvents[]>) => {
      state.events = payload;
    },
    [getSectorsThunk.fulfilled.type]: (state, { payload }: PayloadAction<ISectors[]>) => {
      state.sectors = payload;
    },

    [addLoyaltyThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addLoyaltyThunk.fulfilled.type]: (state, { payload }: PayloadAction<ILoyalty>) => {
      state.isLoading = false;
      state.count += 1;
      state.ids.unshift(payload.id);
      state.entities[payload.id] = payload;
    },
    [addLoyaltyThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [updateLoyaltyThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateLoyaltyThunk.fulfilled.type]: (state, { payload }: PayloadAction<ILoyalty>) => {
      loyaltyAdapter.updateOne(state, { id: payload.id, changes: payload });
      state.isLoading = false;
    },
    [updateLoyaltyThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [deleteLoyaltyThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteLoyaltyThunk.fulfilled.type]: (state, { payload }: PayloadAction<number>) => {
      loyaltyAdapter.removeOne(state, payload);
      state.isLoading = false;
      state.count -= 1;
    },
    [deleteLoyaltyThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [endLoyaltyThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [endLoyaltyThunk.fulfilled.type]: (state, { payload }: PayloadAction<ILoyalty>) => {
      state.isLoading = false;
      loyaltyAdapter.updateOne(state, { id: payload.id, changes: payload });
    },
    [endLoyaltyThunk.rejected.type]: (state) => {
      state.isLoading = false;
    }
  }
});
