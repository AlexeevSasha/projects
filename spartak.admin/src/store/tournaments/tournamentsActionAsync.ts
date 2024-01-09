import { createAsyncThunk } from "@reduxjs/toolkit";
import { tournamentsRepository } from "api/tournamentsRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import { Tournament, TournamentFilter, TournamentsResponse, TournamentTable } from "common/interfaces/tournaments";
import { getTournaments } from "store/dictionary/dictionaryActionAsync";

export const getTournamentsByFilter = createAsyncThunk<TournamentsResponse, TournamentFilter, ThunkApiType>(
  "tournament/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await tournamentsRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getTournamentById = createAsyncThunk<Tournament, Tournament["Id"], ThunkApiType>(
  "tournament/byId",
  async (id, { rejectWithValue }) => {
    return await tournamentsRepository.fetchById(id).catch((error) => rejectWithValue({ error }));
  }
);

export const publishTournaments = createAsyncThunk<Tournament, Tournament, ThunkApiType>(
  "tournament/publish",
  async (stadium, { rejectWithValue, dispatch }) => {
    return await tournamentsRepository
      .publish(stadium)
      .then((res) => {
        dispatch(getTournaments());

        return res;
      })
      .catch((error) => rejectWithValue({ error }));
  }
);

export const draftTournaments = createAsyncThunk<Tournament, Tournament, ThunkApiType>(
  "tournament/draft",
  (stadium, { rejectWithValue, dispatch }) =>
    tournamentsRepository
      .draft(stadium)
      .then((res) => {
        dispatch(getTournaments());

        return res;
      })
      .catch((error) => rejectWithValue({ error }))
);

export const getTournamentTable = createAsyncThunk<
  TournamentTable,
  { tournamentId: Tournament["Id"]; seasonId: string },
  ThunkApiType
>(
  "tournament/getTable",
  async ({ tournamentId, seasonId }: { tournamentId: Tournament["Id"]; seasonId: string }, { rejectWithValue }) =>
    await tournamentsRepository.fetchTable(tournamentId, seasonId).catch((error) => rejectWithValue({ error }))
);

export const saveTournamentTable = createAsyncThunk<TournamentTable, TournamentTable, ThunkApiType>(
  "tournament/saveTable",
  async (table, { rejectWithValue }) =>
    await tournamentsRepository.saveTable(table).catch((error) => rejectWithValue({ error }))
);
