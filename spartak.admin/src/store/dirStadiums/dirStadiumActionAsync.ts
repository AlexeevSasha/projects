import { createAsyncThunk } from "@reduxjs/toolkit";
import { stadiumsRepository } from "api/stadiumsRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import { Stadium, StadiumFilters, StadiumResponce } from "common/interfaces/stadiums";
import { getStadiums } from "store/dictionary/dictionaryActionAsync";

export const getStadiumsByFilter = createAsyncThunk<StadiumResponce, StadiumFilters, ThunkApiType>(
  "stadiums/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await stadiumsRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getStadiumById = createAsyncThunk<Stadium, Stadium["Id"], ThunkApiType>(
  "stadiums/byId",
  async (id, { rejectWithValue }) => {
    return await stadiumsRepository.fetchById(id).catch((error) => rejectWithValue({ error }));
  }
);

export const publishStadium = createAsyncThunk<void, Stadium, ThunkApiType>(
  "stadiums/publish",
  async (stadium, { rejectWithValue, dispatch }) => {
    return await stadiumsRepository
      .publish(stadium)
      .then(() => {
        dispatch(getStadiums());
      })
      .catch((error) => rejectWithValue({ error }));
  }
);

export const deleteStadium = createAsyncThunk<void, Stadium["Id"], ThunkApiType>(
  "stadiums/delete",
  async (id, { rejectWithValue, dispatch }) => {
    return await stadiumsRepository
      .deleteById(id)
      .then(() => {
        dispatch(getStadiums());
      })
      .catch((error) => rejectWithValue({ error }));
  }
);
