import { createAsyncThunk } from "@reduxjs/toolkit";
import { graduateSectionsRepository } from "api/graduateSectionsRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import {
  GraduateSection,
  GraduateSectionsFiltersEntity,
  GraduateSectionsResponce,
} from "common/interfaces/graduateSections";

export const getGraduateSectionsByFilter = createAsyncThunk<
  GraduateSectionsResponce,
  GraduateSectionsFiltersEntity,
  ThunkApiType
>("graduateSections/byFilter", async (filters, { rejectWithValue }) => {
  validationSearchUserName(filters.FullName);

  return await graduateSectionsRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
});

export const getGraduateSectionsById = createAsyncThunk<GraduateSection, GraduateSection["Id"], ThunkApiType>(
  "graduateSections/byId",
  async (id, { rejectWithValue }) => {
    return await graduateSectionsRepository.fetchById(id).catch((error) => rejectWithValue({ error }));
  }
);

export const publishGraduateSections = createAsyncThunk<void, GraduateSection, ThunkApiType>(
  "graduateSections/publish",
  async (id, { rejectWithValue }) => {
    return await graduateSectionsRepository.publish(id).catch((error) => rejectWithValue({ error }));
  }
);

export const draftGraduateSections = createAsyncThunk<void, GraduateSection, ThunkApiType>(
  "graduateSections/draft",
  async (id, { rejectWithValue }) => {
    return await graduateSectionsRepository.draft(id).catch((error) => rejectWithValue({ error }));
  }
);

export const deleteGraduateSections = createAsyncThunk<void, GraduateSection["Id"], ThunkApiType>(
  "graduateSections/delete",
  async (id, { rejectWithValue }) => {
    return await graduateSectionsRepository.deleteById(id).catch((error) => rejectWithValue({ error }));
  }
);
