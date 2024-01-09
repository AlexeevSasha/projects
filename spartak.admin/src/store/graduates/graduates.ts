import { createSlice } from "@reduxjs/toolkit";
import { Graduate } from "common/interfaces/graduates";
import { GraduateSection } from "common/interfaces/graduateSections";
import { getGraduateById, getGraduatesByFilter, getGraduateSectionOptions } from "./graduatesActionAsync";
import i18n from "i18next";
import { SelectFieldOption } from "ui/SelectField";

export type GraduatesState = {
  isLoading: boolean;
  count: number;
  items?: Graduate[];
  entity?: Graduate;
  sections: SelectFieldOption[];
};

export const graduatesInitialState: GraduatesState = {
  isLoading: false,
  count: 0,
  sections: [],
};

export const { actions: graduatesActions, reducer: graduatesReducer } = createSlice({
  name: "graduates",
  initialState: graduatesInitialState,
  reducers: {
    resetEntity(state) {
      state.entity = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGraduatesByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGraduatesByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.items = payload.items;
        state.isLoading = false;
      })
      .addCase(getGraduatesByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getGraduateById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGraduateById.fulfilled, (state, { payload }) => {
        state.entity = payload;
        state.isLoading = false;
      })
      .addCase(getGraduateById.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getGraduateSectionOptions.fulfilled, (state, { payload }) => {
        const locale = i18n.language === "ru" ? "Ru" : "En";
        state.sections = payload.items.map(({ Id, FullName }) => ({ value: Id, label: FullName[locale] }));
      });
  },
});
