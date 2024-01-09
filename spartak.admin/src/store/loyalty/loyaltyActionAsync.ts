import { createAsyncThunk } from "@reduxjs/toolkit";
import { eventRepository } from "api/eventRepository";
import { loyaltyRepository } from "api/loyaltyRepository";
import { matchingRepository } from "api/matchingRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import { SectorDto } from "common/interfaces/event";
import { LoyaltyEntity, LoyaltyFilterEntity, LoyaltyResponce } from "common/interfaces/loyalty";
import { MatchingFiltersType, MatchingResponse } from "common/interfaces/matching";

export const getLoyaltyByFilter = createAsyncThunk<LoyaltyResponce, LoyaltyFilterEntity, ThunkApiType>(
  "loyalty/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await loyaltyRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getLoyaltyById = createAsyncThunk<LoyaltyEntity, LoyaltyEntity["Id"], ThunkApiType>(
  "loyalty/byId",
  (id, { rejectWithValue }) => loyaltyRepository.fetchById(id).catch((error) => rejectWithValue({ error }))
);

export const saveLoyalty = createAsyncThunk<void, LoyaltyEntity, ThunkApiType>(
  "loyalty/save",
  async (body, { rejectWithValue }) => {
    return await loyaltyRepository.save(body).catch((error) => rejectWithValue({ error }));
  }
);

export const updateLoyalty = createAsyncThunk<void, LoyaltyEntity, ThunkApiType>(
  "loyalty/update",
  async (body, { rejectWithValue }) => {
    return await loyaltyRepository.update(body).catch((error) => rejectWithValue({ error }));
  }
);

export const removeLoyalty = createAsyncThunk<void, LoyaltyEntity["Id"], ThunkApiType>(
  "loyalty/update",
  async (id, { rejectWithValue }) => {
    return await loyaltyRepository.remove(id).catch((error) => rejectWithValue({ error }));
  }
);

export const setOutOfStockLoyalty = createAsyncThunk<void, LoyaltyEntity["Id"], ThunkApiType>(
  "loyalty/update",
  async (id, { rejectWithValue }) => {
    return await loyaltyRepository.setOutOfStock(id).catch((error) => rejectWithValue({ error }));
  }
);

export const getEventList = createAsyncThunk<MatchingResponse, MatchingFiltersType | undefined, ThunkApiType>(
  "loyalty/events",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters?.FullName);

    return await matchingRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getSectorList = createAsyncThunk<SectorDto[], string, ThunkApiType>(
  "loyalty/sectors",
  (filters, { rejectWithValue }) => eventRepository.fetchSectors(filters).catch((error) => rejectWithValue({ error }))
);
