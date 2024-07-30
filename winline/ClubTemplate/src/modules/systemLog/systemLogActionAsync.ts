import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSystemLog } from "../../api/requests/systemLog";
import type {ISystemLogFilters} from "../../api/dto/systemLog/ISystemLog";

export const getAllSystemLog = createAsyncThunk(
  "systemLogSlice/getAllSystemLog",
  async (filters: ISystemLogFilters) => await getSystemLog(filters));
