import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { Media } from "common/interfaces/media";
import {
  createMedia,
  getMediaByFilter,
  getMediaById,
  saveMediaInfo,
  saveMediaPicture,
  saveMediaText,
  saveMediaVideo,
} from "./mediaActionAsync";

export type MediaState = {
  isLoading: boolean;
  count: number;
  mediaList?: Media[];
  media?: Media;
};

export const clubsTeamsInitialState: MediaState = {
  isLoading: false,
  count: 0,
};

const getMatcher =
  (action: "pending" | "fulfilled" | "rejected") =>
  ({ type }: AnyAction) =>
    [
      saveMediaInfo[action].type,
      saveMediaText[action].type,
      saveMediaPicture[action].type,
      saveMediaVideo[action].type,
    ].includes(type);

export const { actions: mediaActions, reducer: mediaReducer } = createSlice({
  name: "media",
  initialState: clubsTeamsInitialState,
  reducers: {
    resetMedia(state) {
      state.media = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMediaByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMediaByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.mediaList = payload.media;
        state.isLoading = false;
      })
      .addCase(getMediaByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getMediaById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMediaById.fulfilled, (state, { payload }) => {
        state.media = payload;
        state.isLoading = false;
      })
      .addCase(getMediaById.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(createMedia.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMedia.fulfilled, (state, { payload }) => {
        state.media = payload;
        state.isLoading = false;
      })
      .addCase(createMedia.rejected, (state) => {
        state.isLoading = false;
      })

      .addMatcher(getMatcher("pending"), (state) => {
        state.media = undefined;
        state.isLoading = true;
      })
      .addMatcher(getMatcher("fulfilled"), (state, { payload }) => {
        state.media = payload;
        state.isLoading = false;
      })
      .addMatcher(getMatcher("rejected"), (state) => {
        state.isLoading = false;
      });
  },
});
