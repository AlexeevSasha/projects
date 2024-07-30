import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IStory } from "../../api/dto/content/story/story";
import { addStoryThunk, getAllStoryThunk, removeStoryThunk, updateStoryThunk } from "./storyActionAsync";

export const storyAdapter = createEntityAdapter<IStory>();

export const storySlice = createSlice({
  name: "story",
  initialState: storyAdapter.getInitialState<{ isLoading: boolean; disabledResetFilters: boolean; count: number }>({
    isLoading: false,
    disabledResetFilters: false,
    count: 0
  }),
  reducers: {},
  extraReducers: {
    [getAllStoryThunk.pending.type]: (state) => {
      state.isLoading = true;
      state.disabledResetFilters = true;
    },
    [getAllStoryThunk.fulfilled.type]: (state, { payload }: PayloadAction<{ allStories: IStory[]; count: number }>) => {
      state.count = payload.count;
      storyAdapter.setAll(state, payload.allStories);
      state.isLoading = false;
      state.disabledResetFilters = false;
    },
    [getAllStoryThunk.rejected.type]: (state) => {
      state.isLoading = false;
      state.disabledResetFilters = false;
    },
    [addStoryThunk.pending.type]: (state) => {
      state.isLoading = true;
      state.disabledResetFilters = true;
    },
    [addStoryThunk.fulfilled.type]: (state, { payload }: PayloadAction<IStory>) => {
      state.isLoading = false;
      state.count += 1;
      state.ids.unshift(payload.id);
      state.entities[payload.id] = payload;
    },
    [addStoryThunk.rejected.type]: (state) => {
      state.isLoading = false;
      state.disabledResetFilters = false;
    },
    [updateStoryThunk.pending.type]: (state) => {
      state.isLoading = true;
      state.disabledResetFilters = true;
    },
    [updateStoryThunk.fulfilled.type]: (state, { payload }: PayloadAction<IStory>) => {
      storyAdapter.updateOne(state, { id: payload.id, changes: payload });
      state.isLoading = false;
    },
    [updateStoryThunk.rejected.type]: (state) => {
      state.isLoading = false;
      state.disabledResetFilters = false;
    },
    [removeStoryThunk.pending.type]: (state) => {
      state.isLoading = true;
      state.disabledResetFilters = true;
    },
    [removeStoryThunk.fulfilled.type]: (state, { payload }: PayloadAction<number>) => {
      storyAdapter.removeOne(state, payload);
      state.isLoading = false;
      state.disabledResetFilters = false;
      state.count -= 1;
    },
    [removeStoryThunk.rejected.type]: (state) => {
      state.isLoading = false;
      state.disabledResetFilters = false;
    }
  }
});
