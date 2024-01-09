import { createSlice } from "@reduxjs/toolkit";
import { AlertProps } from "antd";

export type Notice = AlertProps & {
  key: number;
  timeout?: number;
};

export const { actions: noticeActions, reducer: noticeReducer } = createSlice({
  name: "notice",
  initialState: [] as Notice[],
  reducers: {
    add(state, { payload }) {
      const key = +new Date();
      state.push({ timeout: 5000, closable: true, ...payload, key });
    },
    remove(state, { payload }) {
      return state.filter(({ key }) => key !== payload);
    },
  },
});
