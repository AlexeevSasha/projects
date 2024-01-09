import { createAsyncThunk } from "@reduxjs/toolkit";
import { medicalRepository } from "api/medicalRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import { Staff, StaffFilters, StaffResponce } from "../../common/interfaces/staff";

export const getClubsMedicalByFilter = createAsyncThunk<StaffResponce, StaffFilters, ThunkApiType>(
  "clubsMedical/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await medicalRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getClubsMedicalById = createAsyncThunk<Staff, Staff["Id"], ThunkApiType>(
  "clubsMedical/byId",
  async (id, { rejectWithValue }) => {
    return await medicalRepository.fetchById(id).catch((error) => rejectWithValue({ error }));
  }
);

export const publishClubsMedical = createAsyncThunk<void, Staff, ThunkApiType>(
  "clubsMedical/publish",
  async (id, { rejectWithValue }) => {
    return await medicalRepository.publish(id).catch((error) => rejectWithValue({ error }));
  }
);

export const draftClubsMedical = createAsyncThunk<void, Staff, ThunkApiType>(
  "clubsMedical/draft",
  async (id, { rejectWithValue }) => {
    return await medicalRepository.draft(id).catch((error) => rejectWithValue({ error }));
  }
);

export const deleteClubsMedical = createAsyncThunk<void, Staff["Id"], ThunkApiType>(
  "clubsMedical/delete",
  async (id, { rejectWithValue }) => {
    return await medicalRepository.deleteById(id).catch((error) => rejectWithValue({ error }));
  }
);
