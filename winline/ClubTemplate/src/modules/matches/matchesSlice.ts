import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMatch } from "../../api/dto/IMatch";
import { getMatchesThunk, updateMatchesThunk } from "./matchesActionAsync";

export const matchesAdapter = createEntityAdapter<IMatch>();

export const matchesSlice = createSlice({
  name: "matches",
  initialState: matchesAdapter.getInitialState<{ isLoading: boolean; count: number }>({
    isLoading: false,
    count: 0
  }),
  reducers: {},
  extraReducers: {
    [getMatchesThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getMatchesThunk.fulfilled.type]: (state, { payload }: PayloadAction<{ matches: IMatch[]; count: number }>) => {
      state.count = payload.count;
      matchesAdapter.setAll(state, payload.matches);
      state.isLoading = false;
    },
    [getMatchesThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [updateMatchesThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateMatchesThunk.fulfilled.type]: (state, { payload }: PayloadAction<IMatch>) => {
      matchesAdapter.updateOne(state, { id: payload.id, changes: payload });
      state.isLoading = false;
    },
    [updateMatchesThunk.rejected.type]: (state) => {
      state.isLoading = false;
    }
  }
});
