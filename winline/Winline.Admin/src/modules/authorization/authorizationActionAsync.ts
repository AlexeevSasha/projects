import {createAsyncThunk} from "@reduxjs/toolkit";
import {authorization, forgot} from "../../api/requests/auth";
import {setStorageAuth, setStorageUserInfo} from "../../common/helpers/authorization/storageHandlers";
import type {IAuthInfo, IAuthorization, IUserInfo} from "../../api/dto/auth/IAuth";
import {getUserInfo} from "../../api/requests/userInfo";
import { intervalRefreshHandler } from "./helpers/refreshHelper";
import { updateAuthData } from "./authSlice";
import { buildAuthDataRequest } from "./helpers/buildAuthDataRequest";


const autorizationHandler = async (authDataRequest: string): Promise<any> => {
    const authDataResponse: IAuthInfo = await authorization(authDataRequest);
    intervalRefreshHandler(authDataResponse.expires_in);

    return authDataResponse;
  };

export const refreshUser = createAsyncThunk<void, IAuthInfo & { remember: boolean }>("refreshUser", async (dataUser, { dispatch }) => {
    const authDataRequest = buildAuthDataRequest({ refreshToken: dataUser.refresh_token });
    const authDataResponse: IAuthInfo = await autorizationHandler(authDataRequest);
    dispatch(updateAuthData(authDataResponse));
    setStorageAuth(dataUser.remember, authDataResponse);
  });


export const authorizationUser = createAsyncThunk(
    'authData/authorization',
    async (dataUser: IAuthorization) => {
        const authDataRequest = buildAuthDataRequest({ login: dataUser.login, password: dataUser.password });
        const authDataResponse: IAuthInfo = await autorizationHandler(authDataRequest);
        setStorageAuth(dataUser.remember, authDataResponse);
        const userInfoResponse: Omit<IUserInfo, 'remember'> = await getUserInfo(authDataResponse.access_token);
        setStorageUserInfo(dataUser.remember, userInfoResponse);

        return { userInfo: { ...userInfoResponse, remember: dataUser.remember }, authData: authDataResponse};
    },
);

export const forgotPassword = createAsyncThunk(
    'authData/forgot',
    async (email: string) => await forgot(email));
