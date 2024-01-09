import { createAsyncThunk } from "@reduxjs/toolkit";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import {
  SpecialOffer,
  SpecialOfferFilter,
  SpecialOfferRequest,
  SpecialOfferResponse,
} from "../../common/interfaces/specialOffer";
import { specialOfferRepository } from "../../api/specialOffer";
import { directoryRepository } from "api/directoryRepository";

export const publishSpecialOffer = createAsyncThunk<void, SpecialOffer, ThunkApiType>(
  "",
  async (data, { rejectWithValue }) => {
    return await specialOfferRepository.publish(data).catch((error) => rejectWithValue({ error }));
  }
);
export const getSpecialOffersByFilter = createAsyncThunk<SpecialOfferResponse, SpecialOfferFilter, ThunkApiType>(
  "specialOffer/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await specialOfferRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getSpecialOfferById = createAsyncThunk<SpecialOfferRequest, SpecialOfferRequest["Id"], ThunkApiType>(
  "specialOffer/byId",
  async (id, { rejectWithValue }) => {
    return await specialOfferRepository.fetchById(id).catch((error) => rejectWithValue({ error }));
  }
);

export const draftSpecialOffer = createAsyncThunk<void, SpecialOffer, ThunkApiType>(
  "specialOffer/draft",
  async (data, { rejectWithValue }) => {
    return await specialOfferRepository.draft(data).catch((error) => rejectWithValue({ error }));
  }
);

export const deleteSpecialOffer = createAsyncThunk<void, SpecialOffer["Id"]>(
  "specialOffer/delete",
  async (id, { rejectWithValue }) => {
    return await specialOfferRepository.remove(id).catch((error) => rejectWithValue({ error }));
  }
);
