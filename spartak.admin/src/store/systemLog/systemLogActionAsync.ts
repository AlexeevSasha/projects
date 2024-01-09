import { createAsyncThunk } from "@reduxjs/toolkit";
import { systemLogRepository } from "api/systemLogRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import { LogFilters, LogResponce, LogType } from "common/interfaces/systemLog";

export const getLogsByFilter = createAsyncThunk<LogResponce, LogFilters, ThunkApiType>(
  "systemLog/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return systemLogRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getLogById = createAsyncThunk<LogType, LogType["Id"], ThunkApiType>(
  "systemLog/byId",
  async (id, { rejectWithValue }) => systemLogRepository.fetchById(id).catch((error) => rejectWithValue({ error }))
);
