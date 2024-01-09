import { createAsyncThunk } from "@reduxjs/toolkit";
import { clubsPlayersRepository } from "api/playersRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import { Player, PlayersFilters, PlayersResponce } from "common/interfaces/players";

export const getClubsPlayersByFilter = createAsyncThunk<PlayersResponce, PlayersFilters, ThunkApiType>(
  "clubsPlayers/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await clubsPlayersRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getClubsPlayerById = createAsyncThunk<Player, Player["Id"], ThunkApiType>(
  "clubsPlayers/byId",
  async (id, { rejectWithValue }) => {
    return await clubsPlayersRepository.fetchById(id).catch((error) => rejectWithValue({ error }));
  }
);

export const publishClubsPlayer = createAsyncThunk<void, Player, ThunkApiType>(
  "clubsPlayers/publish",
  async (id, { rejectWithValue }) => {
    return await clubsPlayersRepository.publish(id).catch((error) => rejectWithValue({ error }));
  }
);

export const draftClubsPlayer = createAsyncThunk<void, Player, ThunkApiType>(
  "clubsPlayers/draft",
  async (id, { rejectWithValue }) => {
    return await clubsPlayersRepository.draft(id).catch((error) => rejectWithValue({ error }));
  }
);

export const deleteClubsPlayer = createAsyncThunk<void, Player["Id"], ThunkApiType>(
  "clubsPlayers/delete",
  async (id, { rejectWithValue }) => {
    return await clubsPlayersRepository.deleteById(id).catch((error) => rejectWithValue({ error }));
  }
);
