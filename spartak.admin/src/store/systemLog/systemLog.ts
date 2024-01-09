import { createSlice } from "@reduxjs/toolkit";
import { LogType } from "common/interfaces/systemLog";
import { getLogById, getLogsByFilter } from "./systemLogActionAsync";

export type SystemLogState = {
  isLoading: boolean;
  count: number;
  logs?: LogType[];
  log?: LogType;
};

export const systemLogInitialState: SystemLogState = {
  isLoading: false,
  count: 0,
};

export const { actions: systemLogActions, reducer: systemLogReducer } = createSlice({
  name: "partners",
  initialState: systemLogInitialState,
  reducers: {
    resetPartner(state) {
      state.log = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogsByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLogsByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.logs = payload.items;
        state.isLoading = false;
      })
      .addCase(getLogsByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getLogById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLogById.fulfilled, (state, { payload }) => {
        state.log = payload;
        state.isLoading = false;
      })
      .addCase(getLogById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
