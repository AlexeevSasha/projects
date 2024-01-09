import { createSlice } from "@reduxjs/toolkit";
import { getClubsMedicalByFilter, getClubsMedicalById } from "./clubsMedicalActionAsync";
import { Staff } from "../../common/interfaces/staff";

export type ClubsMedicalState = {
  isLoading: boolean;
  count: number;
  medical?: Staff[];
  medicalPerson?: Staff;
};

export const clubsMedicalInitialState: ClubsMedicalState = {
  isLoading: false,
  count: 0,
};

export const { actions: clubsMedicalActions, reducer: clubsMedicalReducer } = createSlice({
  name: "clubsMedical",
  initialState: clubsMedicalInitialState,
  reducers: {
    resetMedical(state) {
      state.medicalPerson = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClubsMedicalByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClubsMedicalByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.medical = payload.staff;
        state.isLoading = false;
      })
      .addCase(getClubsMedicalByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getClubsMedicalById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClubsMedicalById.fulfilled, (state, { payload }) => {
        state.medicalPerson = payload;
        state.isLoading = false;
      })
      .addCase(getClubsMedicalById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
