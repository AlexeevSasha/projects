import { createAsyncThunk } from "@reduxjs/toolkit";
import { calendarRepository } from "api/calendarRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { CalendarEntity, CalendarFiltersType, CalendarResponce } from "common/interfaces/calendar";
import { ThunkApiType } from "common/interfaces/common";

export const getCalendarByFilter = createAsyncThunk<CalendarResponce, CalendarFiltersType, ThunkApiType>(
  "calendar/byFilter",
  (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return calendarRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getCalendarById = createAsyncThunk<CalendarEntity, CalendarEntity["Id"], ThunkApiType>(
  "calendar/byId",
  (id, { rejectWithValue }) => calendarRepository.fetchById(id).catch((error) => rejectWithValue({ error }))
);

export const publishCalendar = createAsyncThunk<CalendarEntity, CalendarEntity, ThunkApiType>(
  "calendar/publish",
  (id, { rejectWithValue }) => calendarRepository.publish(id).catch((error) => rejectWithValue({ error }))
);

export const draftCalendar = createAsyncThunk<CalendarEntity, CalendarEntity, ThunkApiType>(
  "calendar/draft",
  (id, { rejectWithValue }) => calendarRepository.draft(id).catch((error) => rejectWithValue({ error }))
);

export const deleteCalendar = createAsyncThunk<void, CalendarEntity["Id"], ThunkApiType>(
  "calendar/delete",
  (id, { rejectWithValue }) => calendarRepository.deleteById(id).catch((error) => rejectWithValue({ error }))
);
