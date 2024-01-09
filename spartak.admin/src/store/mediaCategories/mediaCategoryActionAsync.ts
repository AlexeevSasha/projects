import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiType } from "../../common/interfaces/common";
import { validationSearchUserName } from "../../common/helpers/validators/validationSearchUserName";
import { Category, CategoryFilters, CategoryResponse } from "../../common/interfaces/mediaCategory";
import { mediaCategoriesRepository } from "../../api/mediaCategoriesRepository";
import { getStadiums } from "../dictionary/dictionaryActionAsync";

export const getCategoriesByFilters = createAsyncThunk<CategoryResponse, CategoryFilters | undefined, ThunkApiType>(
  "mediaCategory/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters?.FullName);

    return await mediaCategoriesRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getCategoryById = createAsyncThunk<Category, Category["Id"], ThunkApiType>(
  "mediaCategory/byId",
  async (id, { rejectWithValue }) => {
    return await mediaCategoriesRepository.fetchById(id).catch((error) => rejectWithValue({ error }));
  }
);

export const publishCategory = createAsyncThunk<void, Category, ThunkApiType>(
  "mediaCategory/publish",
  async (category, { rejectWithValue, dispatch }) => {
    return await mediaCategoriesRepository
      .publish(category)
      .then(() => {
        dispatch(getStadiums());
      })
      .catch((error) => rejectWithValue({ error }));
  }
);

export const deleteCategory = createAsyncThunk<void, Category["Id"], ThunkApiType>(
  "mediaCategory/delete",
  async (id, { rejectWithValue, dispatch }) => {
    return await mediaCategoriesRepository
      .deleteById(id)
      .then(() => {
        dispatch(getStadiums());
      })
      .catch((error) => rejectWithValue({ error }));
  }
);
