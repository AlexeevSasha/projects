import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../api/requests/users";
import type {IFiltersUser} from "../../api/dto/users/IUser";

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (requestData: IFiltersUser) => await getUsers(requestData));
