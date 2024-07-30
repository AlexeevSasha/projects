import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, revokeOfConsentWinLine } from "../../api/requests/users";
import type {IFiltersUser} from "../../api/dto/users/IUser";
import {message} from "antd";
import i18next from "i18next";

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (requestData: IFiltersUser) => await getUsers(requestData));

export const deleteOfConsentWinLine = createAsyncThunk(
  "users/deleteOfConsentWinLine",
  async (id: string) => {
    const response = await revokeOfConsentWinLine(id);
    message.success(i18next.t("success.delete.user"));

    return response;
  }
);
