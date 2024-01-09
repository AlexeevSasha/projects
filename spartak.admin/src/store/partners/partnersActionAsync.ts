import { createAsyncThunk } from "@reduxjs/toolkit";
import { partnersRepository } from "api/partnersRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import { Partner, PartnerFilters, PartnersResponce } from "common/interfaces/partners";

export const getPartners = createAsyncThunk<PartnersResponce, PartnerFilters, ThunkApiType>(
  "partners/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await partnersRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getPartner = createAsyncThunk<Partner, Partner["Id"], ThunkApiType>(
  "partners/byId",
  async (id, { rejectWithValue }) => {
    return await partnersRepository.fetchById(id).catch((error) => rejectWithValue({ error }));
  }
);

export const publishPartner = createAsyncThunk<void, Partner, ThunkApiType>(
  "partners/publish",
  async (id, { rejectWithValue }) => {
    return await partnersRepository.publishPartner(id).catch((error) => rejectWithValue({ error }));
  }
);

export const draftPartner = createAsyncThunk<void, Partner, ThunkApiType>(
  "partners/draft",
  async (id, { rejectWithValue }) => {
    return await partnersRepository.draft(id).catch((error) => rejectWithValue({ error }));
  }
);

export const deletePartner = createAsyncThunk<void, Partner["Id"], ThunkApiType>(
  "partners/delete",
  async (id, { rejectWithValue }) => {
    return await partnersRepository.deletePartner(id).catch((error) => rejectWithValue({ error }));
  }
);
