import { createSlice } from "@reduxjs/toolkit";
import { Team } from "common/interfaces/teams";
import { getDirTeamById, getDirTeamsByFilter } from "./dirTeamsActionAsync";

export type DirTeamsState = {
  isLoading: boolean;
  count: number;
  teams?: Team[];
  team?: Team;
};

export const dirTeamsInitialState: DirTeamsState = {
  isLoading: false,
  count: 0,
};

export const { actions: dirTemasActions, reducer: dirTeamsReducer } = createSlice({
  name: "dirTeams",
  initialState: dirTeamsInitialState,
  reducers: {
    resetTeam(state) {
      state.team = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDirTeamsByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDirTeamsByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.teams = payload.teams;
        state.isLoading = false;
      })
      .addCase(getDirTeamsByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getDirTeamById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDirTeamById.fulfilled, (state, { payload }) => {
        state.team = payload;
        state.isLoading = false;
      })
      .addCase(getDirTeamById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
