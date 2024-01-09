import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiType } from "../../common/interfaces/common";
import { validationSearchUserName } from "../../common/helpers/validators/validationSearchUserName";
import {
  EventItem,
  MatchingFiltersType,
  MatchingItem,
  MatchingResponse,
  UpdateMatching,
  WinlineCoefficientItem,
} from "../../common/interfaces/matching";
import { matchingRepository } from "../../api/matchingRepository";

export const getMatchingListByFilter = createAsyncThunk<
  MatchingResponse,
  MatchingFiltersType | undefined,
  ThunkApiType
>("matching/byFilter", async (filters, { rejectWithValue }) => {
  validationSearchUserName(filters?.FullName);

  return await matchingRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
});

export const getMatchingById = createAsyncThunk<MatchingItem, MatchingItem["Id"], ThunkApiType>(
  "matching/byId",
  async (id, { rejectWithValue }) => await matchingRepository.fetchById(id).catch((error) => rejectWithValue({ error }))
);

export const getMatchingEvents = createAsyncThunk<EventItem[], string, ThunkApiType>(
  "matching/events",
  async (matchDate, { rejectWithValue }) =>
    await matchingRepository.fetchEvents(matchDate).catch((error) => rejectWithValue({ error }))
);

export const getMatchingWinlineCoefficient = createAsyncThunk<WinlineCoefficientItem[], string, ThunkApiType>(
  "matching/coefficients",
  async (matchDate, { rejectWithValue }) =>
    await matchingRepository.fetchWinlineCoefficients(matchDate).catch((error) => rejectWithValue({ error }))
);

export const updateMatching = createAsyncThunk<undefined, UpdateMatching, ThunkApiType>(
  "matching/updateMatching",
  async (body, { rejectWithValue }) =>
    await matchingRepository.updateMatching(body).catch((error) => rejectWithValue({ error }))
);
