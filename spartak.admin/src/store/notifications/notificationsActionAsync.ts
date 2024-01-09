import { createAsyncThunk } from "@reduxjs/toolkit";
import { notificationsRepository } from "api/notificationsRepository";
import { ThunkApiType } from "common/interfaces/common";
import { NoticeEntity, NoticeFilters, NoticeResponce } from "common/interfaces/notifications";

export const getNotificationsByFilter = createAsyncThunk<NoticeResponce, NoticeFilters, ThunkApiType>(
  "notifications/byFilter",
  (filters, { rejectWithValue }) =>
    notificationsRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }))
);

export const getNotificationById = createAsyncThunk<NoticeEntity, NoticeEntity["Id"], ThunkApiType>(
  "notifications/byId",
  (id, { rejectWithValue }) => notificationsRepository.fetchById(id).catch((error) => rejectWithValue({ error }))
);

export const getNotificationByExternalId = createAsyncThunk<NoticeEntity, NoticeEntity["ExternalId"], ThunkApiType>(
  "notifications/byExternalId",
  (externalId, { rejectWithValue }) =>
    notificationsRepository.fetchByExternalId(externalId).catch((error) => rejectWithValue({ error }))
);

export const publishNotification = createAsyncThunk<void, NoticeEntity, ThunkApiType>(
  "notifications/publish",
  (body, { rejectWithValue }) => notificationsRepository.publish(body).catch((error) => rejectWithValue({ error }))
);

export const deleteNotification = createAsyncThunk<void, NoticeEntity["Id"], ThunkApiType>(
  "notifications/delete",
  (id, { rejectWithValue }) => notificationsRepository.deleteById(id).catch((error) => rejectWithValue({ error }))
);

export const updateNotification = createAsyncThunk<void, NoticeEntity, ThunkApiType>(
  "notifications/delete",
  (body, { rejectWithValue }) => notificationsRepository.update(body).catch((error) => rejectWithValue({ error }))
);
