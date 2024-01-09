import { createAsyncThunk } from "@reduxjs/toolkit";
import { graduateSectionsRepository } from "api/graduateSectionsRepository";
import { graduatesRepository } from "api/graduatesRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import { Graduate, GraduatesFiltersEntity, GraduatesResponce } from "common/interfaces/graduates";
import { GraduateSectionsResponce } from "common/interfaces/graduateSections";

export const getGraduatesByFilter = createAsyncThunk<GraduatesResponce, GraduatesFiltersEntity, ThunkApiType>(
  "graduates/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await graduatesRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getGraduateById = createAsyncThunk<Graduate, Graduate["Id"], ThunkApiType>(
  "graduates/byId",
  (id, { rejectWithValue }) => graduatesRepository.fetchById(id).catch((error) => rejectWithValue({ error }))
);

export const publishGraduate = createAsyncThunk<void, Graduate, ThunkApiType>(
  "graduates/publish",
  async (id, { rejectWithValue }) => {
    return await graduatesRepository.publish(id).catch((error) => rejectWithValue({ error }));
  }
);

export const draftGraduate = createAsyncThunk<void, Graduate, ThunkApiType>(
  "graduates/draft",
  async (id, { rejectWithValue }) => {
    return await graduatesRepository.draft(id).catch((error) => rejectWithValue({ error }));
  }
);

export const deleteGraduate = createAsyncThunk<void, Graduate["Id"], ThunkApiType>(
  "graduates/delete",
  async (id, { rejectWithValue }) => {
    return await graduatesRepository.deleteById(id).catch((error) => rejectWithValue({ error }));
  }
);

export const getGraduateSectionOptions = createAsyncThunk<GraduateSectionsResponce, undefined, ThunkApiType>(
  "graduates/sectionOptions",
  (_, { rejectWithValue }) =>
    graduateSectionsRepository
      .fetchByFilter({ pageSize: 0, CustomFilter: "Status ne 'Draft'" })
      .catch((error) => rejectWithValue({ error }))
);
