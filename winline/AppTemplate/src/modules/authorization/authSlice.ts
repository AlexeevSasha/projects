/* eslint-disable max-len */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authorizationUser, forgotPassword } from "./authorizationActionAsync";
import type {IAuthData, IAuthInfo, IUserInfo} from "../../api/dto/auth/IAuth";

const initialState: IAuthData = {
  isLoading: false,
  userInfo: {
    remember: true,
    name: "",
    picture: "",
    policy: "",
    alert: ""
  },
  authData: {
    access_token: "",
    expires_in: 0,
    token_type: "",
    refresh_token: "",
    scope: "",
  },
};

export const authSlice = createSlice({
  name: "authData",
  initialState,
  reducers: {
    clearAuthData: () => initialState,
    updateAuthData: (state, { payload }: PayloadAction<IAuthInfo>) => {
       state.authData = payload;
    },
  },
  extraReducers: {
    [authorizationUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    // TODO ДИме посмотреть
    [authorizationUser.fulfilled.type]: (state, { payload }: PayloadAction<{ authData: IAuthInfo; userInfo: IUserInfo }>) => {
      state.isLoading = false;
      state.authData = payload.authData;
      state.userInfo = payload.userInfo;
    },
    [authorizationUser.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [forgotPassword.pending.type]: (state) => {
      state.isLoading = true;
    },
    [forgotPassword.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [forgotPassword.rejected.type]: (state) => {
      state.isLoading = false;
    }
  }
});

export const {clearAuthData, updateAuthData} = authSlice.actions;
