import { createSlice } from "@reduxjs/toolkit";
import { CalendarEntity } from "common/interfaces/calendar";
import { getCalendarByFilter, getCalendarById } from "./calendarActionAsync";

export type CalendarState = {
  isLoading: boolean;
  count: number;
  list?: CalendarEntity[];
  item?: CalendarEntity;
};

export const calendarInitialState: CalendarState = {
  isLoading: false,
  count: 0,
};

export const { actions: calendarActions, reducer: calendarReducer } = createSlice({
  name: "calendar",
  initialState: calendarInitialState,
  reducers: {
    resetItem(state) {
      state.item = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCalendarByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCalendarByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.list = payload.items;
        state.isLoading = false;
      })
      .addCase(getCalendarByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getCalendarById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCalendarById.fulfilled, (state, { payload }) => {
        state.item = payload;
        state.isLoading = false;
      })
      .addCase(getCalendarById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
