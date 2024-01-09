import { createAsyncThunk } from "@reduxjs/toolkit";
import { matchRepository } from "api/matchRepository";
import { teamsRepository } from "api/teamsRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { IRuStatMatch } from "common/interfaces/IRustatMatches";
import { ThunkApiType } from "common/interfaces/common";
import { Match, MatchEvent, MatchFilters, MatchLineUp, MatchResponce } from "common/interfaces/matches";
import { Team } from "common/interfaces/teams";

export const getMatchListByFilter = createAsyncThunk<MatchResponce, MatchFilters | undefined, ThunkApiType>(
  "match/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters?.FullName);

    return await matchRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getMatchById = createAsyncThunk<Match, Match["Id"], ThunkApiType>(
  "match/byId",
  async (id, { rejectWithValue }) => await matchRepository.fetchById(id).catch((error) => rejectWithValue({ error }))
);

export const getMatchLineUp = createAsyncThunk<MatchLineUp, Match["Id"], ThunkApiType>(
  "match/getLineUp",
  async (id, { rejectWithValue }) => await matchRepository.fetchLineUp(id).catch((error) => rejectWithValue({ error }))
);

export const saveMatchLineUp = createAsyncThunk<MatchLineUp, MatchLineUp, ThunkApiType>(
  "match/saveLineUp",
  async (lineUp, { rejectWithValue }) =>
    await matchRepository.saveLineUp(lineUp).catch((error) => rejectWithValue({ error }))
);

export const publishMatch = createAsyncThunk<Match, Match, ThunkApiType>(
  "match/publish",
  async (match, { rejectWithValue, dispatch }) =>
    await matchRepository
      .publish(match)
      .then((res) => {
        dispatch(getMatchListByFilter({ pagination: 1, sorting: "" }));

        return res;
      })
      .catch((error) => rejectWithValue({ error }))
);

export const draftMatch = createAsyncThunk<Match, Match, ThunkApiType>(
  "match/draft",
  async (match, { rejectWithValue, dispatch }) =>
    await matchRepository
      .draft(match)
      .then((res) => {
        dispatch(getMatchListByFilter({ pagination: 1, sorting: "" }));

        return res;
      })
      .catch((error) => rejectWithValue({ error }))
);

export const deleteMatch = createAsyncThunk<void, Match["Id"], ThunkApiType>(
  "match/delete",
  async (id, { rejectWithValue, dispatch }) => {
    return await matchRepository
      .deleteById(id)
      .then(() => {
        dispatch(getMatchListByFilter({ pagination: 1, sorting: "" }));
      })
      .catch((error) => rejectWithValue({ error }));
  }
);

export const getMatchEvents = createAsyncThunk<MatchEvent[], Match["Id"], ThunkApiType>(
  "match/getEvents",
  async (id, { rejectWithValue }) => await matchRepository.fetchEvents(id).catch((error) => rejectWithValue({ error }))
);

export const saveMatchEvents = createAsyncThunk<MatchEvent, MatchEvent, ThunkApiType>(
  "match/saveEvent",
  async (event, { rejectWithValue }) =>
    await matchRepository.saveEvent(event).catch((error) => rejectWithValue({ error }))
);

export const deleteMatchEvents = createAsyncThunk<void, MatchEvent["Id"], ThunkApiType>(
  "match/deleteEvent",
  async (id, { rejectWithValue }) => await matchRepository.deleteEvent(id).catch((error) => rejectWithValue({ error }))
);

export const getTeams = createAsyncThunk<Team[], undefined, ThunkApiType>("matches/getTeam", (_, { rejectWithValue }) =>
  teamsRepository.fetchAll(undefined).catch((error) => rejectWithValue({ error }))
);

export const getRuStatMatches = createAsyncThunk<
  IRuStatMatch[],
  { teamId: string; date: Match["MatchStartDateTime"] },
  ThunkApiType
>("matches/getRuStatMatches", (params, { rejectWithValue }) =>
  matchRepository.fetchRuStatMatches(params.teamId, params.date).catch((error) => rejectWithValue({ error }))
);
