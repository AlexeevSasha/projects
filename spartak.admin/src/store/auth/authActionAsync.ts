import { createAsyncThunk } from "@reduxjs/toolkit";
import { activationRepository } from "api/activationRepository";
import { identityRepository } from "api/identityRepository";
import type { IAuthDataResponse, IAuthorization } from "common/interfaces/auth";
import { ThunkApiType } from "common/interfaces/common";

export const authorizationUser = createAsyncThunk<IAuthDataResponse, IAuthorization, ThunkApiType>(
  "auth/signIn",
  async (dataUser, { rejectWithValue }) => {
    try {
      const authDataResponse = await identityRepository.authorization(dataUser);
      const userInfoResponse = await identityRepository.getUserInfo(authDataResponse.access_token);
      document.cookie = `authorization=true; max-age=${authDataResponse.expires_in}`;

      return { authDataResponse, userInfoResponse };
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);

export const forgotPassword = createAsyncThunk<void, string, ThunkApiType>(
  "authData/forgot",
  async (email, { rejectWithValue }) => {
    try {
      return await activationRepository.forgot(email);
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);
