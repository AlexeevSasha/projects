import { createSlice } from "@reduxjs/toolkit";
import { Trainer, TrainerDto } from "../../common/interfaces/trainers";
import { getTrainer, getTrainers } from "./trainersActionAsync";

export type TrainersState = {
  isLoading: boolean;
  count: number;
  trainers?: TrainerDto[];
  trainer?: Trainer;
};

export const trainersInitialState: TrainersState = {
  isLoading: false,
  count: 0,
};

export const { actions: trainersActions, reducer: trainersReducer } = createSlice({
  name: "trainers",
  initialState: trainersInitialState,
  reducers: {
    resetTrainer(state) {
      state.trainer = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrainers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrainers.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.trainers = payload.trainers;
        state.isLoading = false;
      })
      .addCase(getTrainers.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getTrainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrainer.fulfilled, (state, { payload }) => {
        state.trainer = payload;
        state.isLoading = false;
      })
      .addCase(getTrainer.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
