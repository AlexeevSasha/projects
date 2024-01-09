import { createAsyncThunk } from "@reduxjs/toolkit";
import { bidToExitRepository } from "api/bidToExitRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import { BidToExitResponce, BidToExitFiltersEntity, BidToExitEntity } from "common/interfaces/kids";

export const getBidToExitsByFilter = createAsyncThunk<BidToExitResponce, BidToExitFiltersEntity, ThunkApiType>(
  "bidToExit/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await bidToExitRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getBidToExitById = createAsyncThunk<BidToExitEntity, BidToExitEntity["Id"], ThunkApiType>(
  "bidToExit/byId",
  (id, { rejectWithValue }) => bidToExitRepository.fetchById(id).catch((error) => rejectWithValue({ error }))
);

export const saveBidToExit = createAsyncThunk<void, BidToExitEntity, ThunkApiType>(
  "bidToExit/save",
  async (body, { rejectWithValue }) => {
    return await bidToExitRepository.save(body).catch((error) => rejectWithValue({ error }));
  }
);

export const updateBidToExit = createAsyncThunk<void, BidToExitEntity, ThunkApiType>(
  "bidToExit/update",
  async (body, { rejectWithValue }) => {
    return await bidToExitRepository.update(body).catch((error) => rejectWithValue({ error }));
  }
);
