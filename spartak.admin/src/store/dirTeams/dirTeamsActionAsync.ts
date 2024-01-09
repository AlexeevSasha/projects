import { createAsyncThunk } from "@reduxjs/toolkit";
import { teamsRepository } from "api/teamsRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import { Team, TeamsFilters, TeamsResponce, TeamType } from "common/interfaces/teams";
import { getTeams } from "store/dictionary/dictionaryActionAsync";

export const getDirTeamsByFilter = createAsyncThunk<TeamsResponce, TeamsFilters, ThunkApiType>(
  "dirTeam/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await teamsRepository
      .fetchByFilter({ ...filters, TeamType: TeamType.opposite })
      .catch((error) => rejectWithValue({ error }));
  }
);

export const getDirTeamById = createAsyncThunk<Team, Team["Id"], ThunkApiType>(
  "dirTeam/byId",
  async (id, { rejectWithValue }) => {
    return await teamsRepository.fetchById(id).catch((error) => rejectWithValue({ error }));
  }
);

export const publishDirTeam = createAsyncThunk<void, Team, ThunkApiType>(
  "dirTeam/publish",
  async (id, { rejectWithValue, dispatch }) => {
    return await teamsRepository
      .publish(id)
      .then(() => {
        dispatch(getTeams());
      })
      .catch((error) => rejectWithValue({ error }));
  }
);

export const deleteDirTeam = createAsyncThunk<void, Team["Id"], ThunkApiType>(
  "dirTeam/delete",
  async (id, { rejectWithValue, dispatch }) => {
    return await teamsRepository
      .deleteById(id)
      .then(() => {
        dispatch(getTeams());
      })
      .catch((error) => rejectWithValue({ error }));
  }
);
