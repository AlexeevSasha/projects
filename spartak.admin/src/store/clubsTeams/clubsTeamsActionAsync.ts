import { createAsyncThunk } from "@reduxjs/toolkit";
import { teamsRepository } from "api/teamsRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import { Team, TeamsFilters, TeamsResponce, TeamType } from "common/interfaces/teams";
import { getTeams } from "store/dictionary/dictionaryActionAsync";

export const getClubsTeamsByFilter = createAsyncThunk<TeamsResponce, TeamsFilters, ThunkApiType>(
  "clubsTeams/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await teamsRepository
      .fetchByFilter({ ...filters, TeamType: TeamType.own })
      .catch((error) => rejectWithValue({ error }));
  }
);

export const getClubsTeamById = createAsyncThunk<Team, Team["Id"], ThunkApiType>(
  "clubsTeams/byId",
  async (id, { rejectWithValue }) => {
    return await teamsRepository.fetchById(id).catch((error) => rejectWithValue({ error }));
  }
);

export const publishClubsTeam = createAsyncThunk<void, Team, ThunkApiType>(
  "clubsTeams/publish",
  async (id, { rejectWithValue, dispatch }) => {
    return await teamsRepository
      .publish(id)
      .then(() => {
        dispatch(getTeams());
      })
      .catch((error) => rejectWithValue({ error }));
  }
);

export const draftClubsTeam = createAsyncThunk<void, Team, ThunkApiType>(
  "clubsTeams/draft",
  async (id, { rejectWithValue, dispatch }) => {
    return await teamsRepository
      .draft(id)
      .then(() => {
        dispatch(getTeams());
      })
      .catch((error) => rejectWithValue({ error }));
  }
);

export const deleteClubsTeam = createAsyncThunk<void, Team["Id"], ThunkApiType>(
  "clubsTeams/Delete",
  async (id, { rejectWithValue, dispatch }) => {
    return await teamsRepository
      .deleteById(id)
      .then(() => {
        dispatch(getTeams());
      })
      .catch((error) => rejectWithValue({ error }));
  }
);
