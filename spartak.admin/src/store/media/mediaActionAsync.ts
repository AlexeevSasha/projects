import { createAsyncThunk } from "@reduxjs/toolkit";
import { mediaRepository } from "api/mediaRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import { Media, MediaFilters, MediaResponce } from "common/interfaces/media";

export const getMediaByFilter = createAsyncThunk<MediaResponce, MediaFilters, ThunkApiType>(
  "media/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await mediaRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getMediaById = createAsyncThunk<Media, Media["Id"], ThunkApiType>(
  "media/byId",
  async (id, { rejectWithValue }) => {
    return await mediaRepository.fetchById(id).catch((error) => rejectWithValue({ error }));
  }
);

export const createMedia = createAsyncThunk<Media, undefined, ThunkApiType>(
  "media/create",
  async (_, { rejectWithValue }) => await mediaRepository.create().catch((error) => rejectWithValue({ error }))
);

export const publishMedia = createAsyncThunk<void, Media["Id"], ThunkApiType>(
  "media/publish",
  async (id, { rejectWithValue }) => {
    return await mediaRepository.publish(id).catch((error) => rejectWithValue({ error }));
  }
);

export const draftMedia = createAsyncThunk<void, Media["Id"], ThunkApiType>(
  "media/draft",
  async (id, { rejectWithValue }) => {
    return await mediaRepository.draft(id).catch((error) => rejectWithValue({ error }));
  }
);

export const saveMediaInfo = createAsyncThunk<Media, Media, ThunkApiType>(
  "media/saveInfo",
  async (media, { rejectWithValue }) => {
    return await mediaRepository.saveInfo(media).catch((error) => rejectWithValue({ error }));
  }
);

export const saveMediaText = createAsyncThunk<Media, Media, ThunkApiType>(
  "media/saveText",
  async (media, { rejectWithValue }) => {
    return await mediaRepository.saveText(media).catch((error) => rejectWithValue({ error }));
  }
);

export const saveMediaPicture = createAsyncThunk<Media, Media, ThunkApiType>(
  "media/savePicture",
  async (media, { rejectWithValue }) => {
    return await mediaRepository.savePicture(media).catch((error) => rejectWithValue({ error }));
  }
);

export const saveMediaVideo = createAsyncThunk<Media, Media, ThunkApiType>(
  "media/saveVideo",
  async (media, { rejectWithValue }) => {
    return await mediaRepository.saveVideo(media).catch((error) => rejectWithValue({ error }));
  }
);

export const deleteMedia = createAsyncThunk<void, Media["Id"], ThunkApiType>(
  "media/delete",
  async (id, { rejectWithValue }) => {
    return await mediaRepository.deleteById(id).catch((error) => rejectWithValue({ error }));
  }
);
