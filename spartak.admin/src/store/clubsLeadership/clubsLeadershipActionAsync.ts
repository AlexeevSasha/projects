import { createAsyncThunk } from "@reduxjs/toolkit";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import { ILeadership, LeadershipFilters, LeadershipResponce } from "../../common/interfaces/ILeadership";
import { leadershipRepository } from "../../api/leadershipRepository";

export const getClubsLeadershipByFilter = createAsyncThunk<LeadershipResponce, LeadershipFilters, ThunkApiType>(
  "clubsLeadership/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await leadershipRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getClubsLeaderById = createAsyncThunk<ILeadership, ILeadership["Id"], ThunkApiType>(
  "clubsLeadership/byId",
  async (id, { rejectWithValue }) => {
    return await leadershipRepository.fetchById(id).catch((error) => rejectWithValue({ error }));
  }
);

export const publishClubsLeader = createAsyncThunk<void, ILeadership, ThunkApiType>(
  "clubsLeadership/publish",
  async (id, { rejectWithValue }) => {
    return await leadershipRepository.publish(id).catch((error) => rejectWithValue({ error }));
  }
);

export const draftClubsLeader = createAsyncThunk<void, ILeadership, ThunkApiType>(
  "clubsLeadership/draft",
  async (id, { rejectWithValue }) => {
    return await leadershipRepository.draft(id).catch((error) => rejectWithValue({ error }));
  }
);

export const deleteClubsLeader = createAsyncThunk<void, ILeadership["Id"], ThunkApiType>(
  "clubsLeadership/delete",
  async (id, { rejectWithValue }) => {
    return await leadershipRepository.deleteById(id).catch((error) => rejectWithValue({ error }));
  }
);
