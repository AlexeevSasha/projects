import { createAsyncThunk } from "@reduxjs/toolkit";
import { dictionaryRepository } from "api/dictionaryReposytory";
import { directoryRepository } from "api/directoryRepository";
import { refereeRepository } from "api/refereeRepository";
import { seasonsRepository } from "api/seasonsRepository";
import { stadiumsRepository } from "api/stadiumsRepository";
import { teamsRepository } from "api/teamsRepository";
import { tournamentsRepository } from "api/tournamentsRepository";
import { getClubSection } from "common/constants/teams";
import { ThunkApiType } from "common/interfaces/common";
import {
  Amplua,
  AmpluaFilters,
  CitiesFilters,
  City,
  CountriesFilters,
  Country,
  SeasonsResponse,
} from "common/interfaces/dictionary";
import { Referee } from "common/interfaces/referee";
import { UserLevel } from "common/interfaces/specialOffer";
import { Stadium } from "common/interfaces/stadiums";
import { Team } from "common/interfaces/teams";
import { TournamentsResponse } from "common/interfaces/tournaments";

export const dictionaryInit = createAsyncThunk<void, undefined, ThunkApiType>(
  "dictionary/init",
  (_, { dispatch, rejectWithValue }) => {
    Promise.all([
      dispatch(getCountries()),
      dispatch(getCities()),
      dispatch(getAmplua()),
      dispatch(getAllAmplua()),
      dispatch(getTeams()),
      dispatch(getStadiums()),
      dispatch(getTournaments()),
      dispatch(getSeasons()),
      dispatch(getReferee()),
      dispatch(getUserLevels()),
    ]).catch((error) => rejectWithValue({ error }));
  }
);

export const getCountries = createAsyncThunk<Country[], CountriesFilters | undefined, ThunkApiType>(
  "dictionary/getCountries",
  (filters, { rejectWithValue }) =>
    dictionaryRepository.fetchCountries(filters).catch((error) => rejectWithValue({ error }))
);

export const getCities = createAsyncThunk<City[], CitiesFilters | undefined, ThunkApiType>(
  "dictionary/getCities",
  (filters, { rejectWithValue }) =>
    dictionaryRepository.fetchCities(filters).catch((error) => rejectWithValue({ error }))
);

export const getAmplua = createAsyncThunk<Amplua[], AmpluaFilters | undefined, ThunkApiType>(
  "dictionary/getAmplua",
  (filters, { rejectWithValue }) =>
    dictionaryRepository.fetchAmplua(filters).catch((error) => rejectWithValue({ error }))
);
export const getAllAmplua = createAsyncThunk<Amplua[], AmpluaFilters | undefined, ThunkApiType>(
  "dictionary/getAllAmplua",
  (filters, { rejectWithValue }) =>
    dictionaryRepository.fetchAllAmplua(filters).catch((error) => rejectWithValue({ error }))
);

export const getTeams = createAsyncThunk<Team[], undefined, ThunkApiType>(
  "dictionary/getTeam",
  (_, { rejectWithValue, getState }) =>
    teamsRepository
      .fetchAll(getClubSection(getState().auth.userInfo.policy))
      .catch((error) => rejectWithValue({ error }))
);

export const getStadiums = createAsyncThunk<Stadium[], undefined, ThunkApiType>(
  "dictionary/getStadiums",
  (_, { rejectWithValue }) => stadiumsRepository.fetchAll().catch((error) => rejectWithValue({ error }))
);

export const getTournaments = createAsyncThunk<TournamentsResponse, undefined, ThunkApiType>(
  "dictionary/getTournaments",
  (_, { rejectWithValue }) =>
    tournamentsRepository
      .fetchByFilter({
        pageSize: 50,
        Status: "Published",
      })
      .catch((error) => rejectWithValue({ error }))
);

export const getSeasons = createAsyncThunk<SeasonsResponse, undefined, ThunkApiType>(
  "dictionary/getSeasons",
  (_, { rejectWithValue }) => seasonsRepository.fetchAllSeasons().catch((error) => rejectWithValue({ error }))
);

export const getReferee = createAsyncThunk<Referee[], undefined, ThunkApiType>(
  "dictionary/getReferee",
  (_, { rejectWithValue }) => refereeRepository.fetchAll().catch((error) => rejectWithValue({ error }))
);

export const getUserLevels = createAsyncThunk<UserLevel[], undefined, ThunkApiType>(
  "dictionary/getLevels",
  async (_, { rejectWithValue }) => {
    return await directoryRepository.getUserLevels().catch((error) => rejectWithValue({ error }));
  }
);
