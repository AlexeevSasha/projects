import { createAsyncThunk } from "@reduxjs/toolkit";
import { comicRepository } from "api/comicRepository";
import { comicSeasonRepository } from "api/comicSeasonRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import { ComicEntity, ComicFilterEntity, ComicResponce, ComicSessonEntity } from "common/interfaces/kids";

export const getComicsByFilter = createAsyncThunk<ComicResponce, ComicFilterEntity, ThunkApiType>(
  "comic/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await comicRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getComicById = createAsyncThunk<ComicEntity, ComicEntity["Id"], ThunkApiType>(
  "comic/byId",
  (id, { rejectWithValue }) => comicRepository.fetchById(id).catch((error) => rejectWithValue({ error }))
);

export const saveComic = createAsyncThunk<void, ComicEntity, ThunkApiType>(
  "comic/save",
  async (body, { rejectWithValue }) => {
    return await comicRepository.save(body).catch((error) => rejectWithValue({ error }));
  }
);

export const deleteComic = createAsyncThunk<void, ComicEntity["Id"], ThunkApiType>(
  "comic/delete",
  async (id, { rejectWithValue }) => {
    return await comicRepository.deleteById(id).catch((error) => rejectWithValue({ error }));
  }
);

export const getComicSeasonOptions = createAsyncThunk<ComicSessonEntity[], undefined, ThunkApiType>(
  "comic/seasons",
  (_, { rejectWithValue }) => comicSeasonRepository.fetchAll().catch((error) => rejectWithValue({ error }))
);
