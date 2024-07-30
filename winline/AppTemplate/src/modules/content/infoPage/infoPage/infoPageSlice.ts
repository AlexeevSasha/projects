import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInfoPage } from "../../../../api/dto/content/IInfoPage";
import { addInfoPageThunk, removeInfoPageThunk, getAllInfoPageThunk, updateInfoPageThunk } from "./infoPageActionAsync";

export const infoPageAdapter = createEntityAdapter<IInfoPage>({
  selectId: (infoPage) => infoPage.id
});

export const infoPage = createSlice({
  name: "infoPage",
  initialState: infoPageAdapter.getInitialState<{ isLoading: boolean; count: number; currentInfoPage: IInfoPage | null }>({
    isLoading: false,
    count: 0,
    currentInfoPage: null
  }),
  reducers: {
    setCurrentInfoPage: (state, action) => {
      state.currentInfoPage = action.payload.infoPage;
    }
  },
  extraReducers: {
    [getAllInfoPageThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllInfoPageThunk.fulfilled.type]: (state, { payload }: PayloadAction<{ allInfoPage: IInfoPage[]; count: number }>) => {
      state.count = payload.count;
      infoPageAdapter.setAll(state, payload.allInfoPage);
      state.isLoading = false;
    },
    [getAllInfoPageThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [addInfoPageThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addInfoPageThunk.fulfilled.type]: (state, { payload }: PayloadAction<IInfoPage>) => {
      state.isLoading = false;
      state.count += 1;
      state.ids.unshift(payload.id);
      state.entities[payload.id] = payload;
    },
    [addInfoPageThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [updateInfoPageThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateInfoPageThunk.fulfilled.type]: (state, { payload }: PayloadAction<IInfoPage>) => {
      infoPageAdapter.updateOne(state, { id: payload.id, changes: payload });
      state.isLoading = false;
    },
    [updateInfoPageThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [removeInfoPageThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [removeInfoPageThunk.fulfilled.type]: (state, { payload }: PayloadAction<number>) => {
      infoPageAdapter.removeOne(state, payload);
      state.isLoading = false;
      state.count -= 1;
    },
    [removeInfoPageThunk.rejected.type]: (state) => {
      state.isLoading = false;
    }
  }
});
