import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { PagesSectionInfoT } from "common/interfaces/IPagesSection";
import { ISectionData } from "common/interfaces/pagesSections";
import { getSectionDataThunk } from "./sectionDataActionAsync";

export type PagesSectionState = {
  isLoading: boolean;
  sectionInfo?: PagesSectionInfoT;
};

export const sectionDataAdapter = createEntityAdapter<ISectionData>();

export const pagesSectionInitialState: PagesSectionState = {
  isLoading: false,
  sectionInfo: undefined,
};

export const { actions: sectionsActions, reducer: pagesSectionsReducer } = createSlice({
  name: "sectionData",
  initialState: pagesSectionInitialState,
  reducers: {
    clean: (state) => {
      state.sectionInfo = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSectionDataThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSectionDataThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.sectionInfo = payload?.JsonData
          ? { schema: payload.Type, info: JSON.parse(payload?.JsonData) }
          : undefined;
      });
  },
});
