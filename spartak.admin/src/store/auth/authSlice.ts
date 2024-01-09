import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { t } from "i18next";
import type { AuthState, IAlertState } from "../../common/interfaces/auth";
import { authorizationUser, forgotPassword } from "./authActionAsync";

export const authInitialState: AuthState = {
  isLoading: false,
  alert: {
    message: "",
    type: undefined,
  },
  userInfo: {
    name: "",
    picture: "",
    policy: "",
    alert: "",
  },
  authInfo: {
    access_token: "",
    expires_in: 0,
    token_type: "",
    refresh_token: "",
    scope: "",
  },
};

export const { actions: authAction, reducer: authReducer } = createSlice({
  name: "authData",
  initialState: authInitialState,
  reducers: {
    clearAuthData: () => authInitialState,
    setAuthAlert: (state, { payload }: PayloadAction<IAlertState>) => {
      state.alert = payload;
    },
    clearAuthAlert: (state) => {
      state.alert = { message: "", type: undefined };
    },
    updateUserInfo: (state, { payload }) => {
      state.userInfo.policy = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authorizationUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authorizationUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userInfo = payload.userInfoResponse;
        state.authInfo = payload.authDataResponse;
      })
      .addCase(authorizationUser.rejected, (state, { payload = {} }) => {
        const { error } = payload;
        state.alert = {
          message:
            (error as { status: number })?.status !== 400
              ? t("auth.forgotPassword.uiContent.modal.error.errorRequest")
              : t("auth.forgotPassword.uiContent.modal.error.errorAccount"),
          type: "error",
        };
        state.isLoading = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.alert = {
          message: t("auth.forgotPassword.uiContent.modal.success.successForgot"),
          type: "success",
        };
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.alert = {
          message: t("auth.forgotPassword.uiContent.modal.error.errorForgotNonExist") || "",
          type: "error",
        };
        state.isLoading = false;
      });
  },
});
