import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ISystemLogItem } from "../../api/dto/systemLog/ISystemLog";
import { getAllSystemLog } from "./systemLogActionAsync";

interface ISystemLogState {
  count: number;
  isLoading: boolean;
}

export const systemLogAdapter = createEntityAdapter<ISystemLogItem>();

export const systemLogSlice = createSlice({
  name: "systemLog",
  initialState: systemLogAdapter.getInitialState<ISystemLogState>({
    count: 0,
    isLoading: false
  }),
  reducers: {},
  extraReducers: {
    [getAllSystemLog.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllSystemLog.fulfilled.type]: (state, { payload }: PayloadAction<{ data: ISystemLogItem[]; count: number }>) => {
      state.count = payload.count;
      systemLogAdapter.setAll(state, payload.data);
      state.isLoading = false;
    },
    [getAllSystemLog.rejected.type]: (state) => {
      state.isLoading = false;
    }
  }
});
