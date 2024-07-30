import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IImageInfoPage } from "../../../../api/dto/content/IImageInfoPage";
import {
  addImageInfoPageThunk,
  deleteImageInfoPageThunk,
  getAllImageInfoPageThunk,
  updateImageInfoPageThunk
} from "./imageInfoPageActionAsync";

export const imageInfoPageAdapter = createEntityAdapter<IImageInfoPage>({
  selectId: (imgeInfoPage) => imgeInfoPage.id
});

export const imageInfoPage = createSlice({
  name: "imageInfoPage",
  initialState: imageInfoPageAdapter.getInitialState<{ count: number; isLoading: boolean }>({
    isLoading: false,
    count: 0
  }),
  reducers: {
    setStateLoadigImageInfoPage: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: {
    [getAllImageInfoPageThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllImageInfoPageThunk.fulfilled.type]: (
      state,
      { payload }: PayloadAction<{ allImagesInfoPage: IImageInfoPage[]; count: number }>
    ) => {
      state.count = payload.count;
      imageInfoPageAdapter.setAll(state, payload.allImagesInfoPage);
      state.isLoading = false;
    },
    [getAllImageInfoPageThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [addImageInfoPageThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addImageInfoPageThunk.fulfilled.type]: (state, { payload }: PayloadAction<IImageInfoPage>) => {
      state.isLoading = false;
      state.count += 1;
      state.ids.unshift(payload.id);
      state.entities[payload.id] = payload;
    },
    [addImageInfoPageThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [updateImageInfoPageThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateImageInfoPageThunk.fulfilled.type]: (state, { payload }: PayloadAction<IImageInfoPage>) => {
      imageInfoPageAdapter.updateOne(state, { id: payload.id, changes: payload });
      state.isLoading = false;
    },
    [updateImageInfoPageThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [deleteImageInfoPageThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteImageInfoPageThunk.fulfilled.type]: (state, { payload }: PayloadAction<number>) => {
      imageInfoPageAdapter.removeOne(state, payload);
      state.isLoading = false;
      state.count -= 1;
    },
    [deleteImageInfoPageThunk.rejected.type]: (state) => {
      state.isLoading = false;
    }
  }
});
