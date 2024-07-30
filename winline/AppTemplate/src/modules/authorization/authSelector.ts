import type { StateType } from "../../core/redux/store";
import { createSelector } from "@reduxjs/toolkit";

const getUSerAccessToken = (state: StateType) => state.authData.authData.access_token;
const getUSerRemember = (state: StateType) => state.authData.userInfo.remember;
const getUSerAuthData = (state: StateType) => state.authData.authData;
const getUSerInfo = (state: StateType) => state.authData.userInfo;

export const getUserAccessToken = createSelector(getUSerAccessToken, (userAccessToken) => userAccessToken);
export const getUserRemember = createSelector(getUSerRemember, (userRemember) => userRemember);
export const getUserAuthData = createSelector(getUSerAuthData, (userAuthData) => userAuthData);
export const getUserInfoData = createSelector(getUSerInfo, (userInfo) => userInfo);