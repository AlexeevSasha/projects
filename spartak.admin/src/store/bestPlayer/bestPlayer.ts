import { createSlice } from "@reduxjs/toolkit";
import { BestPlayerEntity, SeasonsForMvp, VotingMatch } from "common/interfaces/bestPlayer";
import { Player } from "common/interfaces/players";
import {
  getBestPlayer,
  getBestPlayerList,
  getMainTeamPlayers,
  getSeasonForMvp,
  getVotingMatches,
} from "store/bestPlayer/bestPlayerActionAsync";

export type BestPlayerState = {
  isLoading: boolean;
  count: number;
  items?: BestPlayerEntity[];
  entity?: BestPlayerEntity;
  mainTeamPlayers: Player[];
  matches: VotingMatch[];
  seasons: SeasonsForMvp[];
};

export const bestPlayerInitialState: BestPlayerState = {
  isLoading: false,
  count: 0,
  mainTeamPlayers: [],
  matches: [],
  seasons: [],
};

export const { actions: bestPlayerActions, reducer: bestPlayerReducer } = createSlice({
  name: "bestPlayer",
  initialState: bestPlayerInitialState,
  reducers: {
    resetEntity(state) {
      state.entity = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBestPlayerList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBestPlayerList.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.items = payload.items;
        state.isLoading = false;
      })
      .addCase(getBestPlayerList.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getBestPlayer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBestPlayer.fulfilled, (state, { payload }) => {
        state.entity = payload;
        state.isLoading = false;
      })
      .addCase(getBestPlayer.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getMainTeamPlayers.fulfilled, (state, { payload }) => {
        state.mainTeamPlayers = payload;
        state.isLoading = false;
      })

      .addCase(getVotingMatches.fulfilled, (state, { payload }) => {
        state.matches = payload;
        state.isLoading = false;
      })

      .addCase(getSeasonForMvp.fulfilled, (state, { payload }) => {
        state.seasons = payload;
        state.isLoading = false;
      });
  },
});
