import { createSlice } from "@reduxjs/toolkit";
import { Tournament, TournamentTable } from "common/interfaces/tournaments";
import { getTournamentById, getTournamentsByFilter, getTournamentTable } from "./tournamentsActionAsync";

export type TournamentsState = {
  isLoading: boolean;
  count: number;
  tournaments?: Tournament[];
  tournament?: Tournament;
  table?: TournamentTable;
};

export const dirStadiumsInitialState: TournamentsState = {
  isLoading: false,
  count: 0,
};

export const { actions: tournamentsActions, reducer: tournamentsReducer } = createSlice({
  name: "tournaments",
  initialState: dirStadiumsInitialState,
  reducers: {
    resetTournament(state) {
      state.tournament = undefined;
    },
    setShowTable(state, { payload }) {
      if (state.tournament) {
        state.tournament = { ...state.tournament, ShowTournamentTable: payload };
      }
    },
    resetTable(state) {
      state.table = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTournamentsByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTournamentsByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.tournaments = payload.tournaments;
        state.isLoading = false;
      })
      .addCase(getTournamentsByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getTournamentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTournamentById.fulfilled, (state, { payload }) => {
        state.tournament = payload;
        state.isLoading = false;
      })
      .addCase(getTournamentById.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getTournamentTable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTournamentTable.fulfilled, (state, { payload }) => {
        state.table = payload;
        state.isLoading = false;
      })
      .addCase(getTournamentTable.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
