import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserFilters, UsersResponce } from "common/interfaces/user";
import { usersRepository } from "api/usersRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { globalNotification } from "common/helpers/globalNotification";
import { ThunkApiType } from "common/interfaces/common";
import { IRequestResponseError } from "common/interfaces/IRequestResponseError";

export const getAllUsers = createAsyncThunk<UsersResponce, UserFilters, ThunkApiType>(
  "users/getAllUsers",
  async (filters: UserFilters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await usersRepository.getUsers(filters).catch((error) => {
      globalNotification(error as IRequestResponseError);

      return rejectWithValue({ error });
    });
  }
);
