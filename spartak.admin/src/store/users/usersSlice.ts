import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "common/interfaces/user";
import type { IAlert } from "common/interfaces/IAlert";
import { getAllUsers } from "./usersActionAsync";

export type UserViewState = {
  isLoading: boolean;
  alerts: IAlert[];
  count: number;
  users?: User[];
};

export const userViewInitialState: UserViewState = {
  isLoading: false,
  alerts: [],
  count: 0,
};

export const { actions: usersViewActions, reducer: usersViewReducer } = createSlice({
  name: "users",
  initialState: userViewInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.users = payload.users;
        state.isLoading = false;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
