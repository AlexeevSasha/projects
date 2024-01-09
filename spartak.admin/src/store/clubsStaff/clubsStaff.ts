import { createSlice } from "@reduxjs/toolkit";
import { Staff } from "common/interfaces/staff";
import { getClubsStaffById, getClubsStaffsByFilter } from "./clubsStaffActionAsync";

export type ClubsStaffState = {
  isLoading: boolean;
  count: number;
  staff?: Staff[];
  stuff?: Staff;
};

export const clubsStaffInitialState: ClubsStaffState = {
  isLoading: false,
  count: 0,
};

export const { actions: clubsStaffActions, reducer: clubsStaffReducer } = createSlice({
  name: "clubsStaff",
  initialState: clubsStaffInitialState,
  reducers: {
    resetStaff(state) {
      state.stuff = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClubsStaffsByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClubsStaffsByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.staff = payload.staff;
        state.isLoading = false;
      })
      .addCase(getClubsStaffsByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getClubsStaffById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClubsStaffById.fulfilled, (state, { payload }) => {
        state.stuff = payload;
        state.isLoading = false;
      })
      .addCase(getClubsStaffById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
