import { createAsyncThunk } from "@reduxjs/toolkit";
import { comicSeasonRepository } from "api/comicSeasonRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import { ComicSeasonFilterEntity, ComicSeasonResponce, ComicSessonEntity } from "common/interfaces/kids";

export const getComicSeasonsByFilter = createAsyncThunk<ComicSeasonResponce, ComicSeasonFilterEntity, ThunkApiType>(
  "comicSeasons/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await comicSeasonRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getComicSeasonById = createAsyncThunk<ComicSessonEntity, ComicSessonEntity["Id"], ThunkApiType>(
  "comicSeasons/byId",
  (id, { rejectWithValue }) => comicSeasonRepository.fetchById(id).catch((error) => rejectWithValue({ error }))
);

export const saveComicSeasons = createAsyncThunk<void, ComicSessonEntity, ThunkApiType>(
  "comicSeasons/save",
  async (body, { rejectWithValue }) => {
    return await comicSeasonRepository.save(body).catch((error) => rejectWithValue({ error }));
  }
);

export const deleteComicSeasons = createAsyncThunk<void, ComicSessonEntity["Id"], ThunkApiType>(
  "comicSeasons/delete",
  async (id, { rejectWithValue }) => {
    return await comicSeasonRepository.deleteById(id).catch((error) => rejectWithValue({ error }));
  }
);
