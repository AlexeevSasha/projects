import { createSlice } from "@reduxjs/toolkit";
import { GraduateSection } from "common/interfaces/graduateSections";
import { getGraduateSectionsByFilter, getGraduateSectionsById } from "./graduateSectionsActionAsync";

export type GraduateSectionsState = {
  isLoading: boolean;
  count: number;
  items?: GraduateSection[];
  entity?: GraduateSection;
};

export const graduateSectionsInitialState: GraduateSectionsState = {
  isLoading: false,
  count: 0,
};

export const { actions: graduateSectionsActions, reducer: graduateSectionsReducer } = createSlice({
  name: "graduateSections",
  initialState: graduateSectionsInitialState,
  reducers: {
    resetEntity(state) {
      state.entity = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGraduateSectionsByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGraduateSectionsByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.items = payload.items;
        state.isLoading = false;
      })
      .addCase(getGraduateSectionsByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getGraduateSectionsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGraduateSectionsById.fulfilled, (state, { payload }) => {
        state.entity = payload;
        state.isLoading = false;
      })
      .addCase(getGraduateSectionsById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
