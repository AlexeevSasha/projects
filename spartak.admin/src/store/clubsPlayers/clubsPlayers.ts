import { createSlice } from "@reduxjs/toolkit";
import { Player } from "common/interfaces/players";
import { getClubsPlayerById, getClubsPlayersByFilter } from "./clubsPlayersActionAsync";

export type ClubsPlayerState = {
  isLoading: boolean;
  count: number;
  players?: Player[];
  player?: Player;
};

export const clubsPlayersInitialState: ClubsPlayerState = {
  isLoading: false,
  count: 0,
};

export const { actions: clubsPlayersActions, reducer: clubsPlayersReducer } = createSlice({
  name: "dirTeams",
  initialState: clubsPlayersInitialState,
  reducers: {
    resetPlayer(state) {
      state.player = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClubsPlayersByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClubsPlayersByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.players = payload.players;
        state.isLoading = false;
      })
      .addCase(getClubsPlayersByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getClubsPlayerById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClubsPlayerById.fulfilled, (state, { payload }) => {
        state.player = payload;
        state.isLoading = false;
      })
      .addCase(getClubsPlayerById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
