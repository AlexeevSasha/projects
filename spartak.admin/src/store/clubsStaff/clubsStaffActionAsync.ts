import { createAsyncThunk } from "@reduxjs/toolkit";
import { stuffRepository } from "api/stuffRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import { Staff, StaffFilters, StaffResponce } from "common/interfaces/staff";

export const getClubsStaffsByFilter = createAsyncThunk<StaffResponce, StaffFilters, ThunkApiType>(
  "clubsStuff/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await stuffRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getClubsStaffById = createAsyncThunk<Staff, Staff["Id"], ThunkApiType>(
  "clubsStuff/byId",
  async (id, { rejectWithValue }) => {
    return await stuffRepository.fetchById(id).catch((error) => rejectWithValue({ error }));
  }
);

export const publishClubsStaff = createAsyncThunk<void, Staff, ThunkApiType>(
  "clubsStuff/publish",
  async (id, { rejectWithValue }) => {
    return await stuffRepository.publish(id).catch((error) => rejectWithValue({ error }));
  }
);

export const draftClubsStaff = createAsyncThunk<void, Staff, ThunkApiType>(
  "clubsStuff/draft",
  async (id, { rejectWithValue }) => {
    return await stuffRepository.draft(id).catch((error) => rejectWithValue({ error }));
  }
);

export const deleteClubsStaff = createAsyncThunk<void, Staff["Id"], ThunkApiType>(
  "clubsStuff/delete",
  async (id, { rejectWithValue }) => {
    return await stuffRepository.deleteById(id).catch((error) => rejectWithValue({ error }));
  }
);
