import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMatch, IMatchFilters } from "../../api/dto/IMatch";
import { getMatches, updateMatches } from "../../api/requests/matches";

export const getMatchesThunk = createAsyncThunk("matches/getAllMatches", async (request: IMatchFilters) => await getMatches(request));

export const updateMatchesThunk = createAsyncThunk("matches/updateMatch", async (data: IMatch, { rejectWithValue }) => {
  try {
    return await updateMatches(data);
  } catch (error) {
    return rejectWithValue(error);
  }
});
