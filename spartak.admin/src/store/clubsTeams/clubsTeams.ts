import { createSlice } from "@reduxjs/toolkit";
import { Team } from "common/interfaces/teams";
import { getClubsTeamById, getClubsTeamsByFilter } from "./clubsTeamsActionAsync";

export type ClubsTeamsState = {
  isLoading: boolean;
  count: number;
  teams?: Team[];
  team?: Team;
};

export const clubsTeamsInitialState: ClubsTeamsState = {
  isLoading: false,
  count: 0,
};

export const { actions: clubsTemasActions, reducer: clubsTeamsReducer } = createSlice({
  name: "clubsTeams",
  initialState: clubsTeamsInitialState,
  reducers: {
    resetTeam(state) {
      state.team = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClubsTeamsByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClubsTeamsByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.teams = payload.teams;
        state.isLoading = false;
      })
      .addCase(getClubsTeamsByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getClubsTeamById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClubsTeamById.fulfilled, (state, { payload }) => {
        state.team = payload;
        state.isLoading = false;
      })
      .addCase(getClubsTeamById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
