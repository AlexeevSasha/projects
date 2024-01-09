import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const state = ({ auth }: StateType) => auth;

export const rightsSelector = createSelector(state, ({ userInfo }) => userInfo.policy);
export const userNameSelector = createSelector(state, ({ userInfo }) => userInfo.name);
export const accessTokenSelector = createSelector(state, ({ authInfo }) => authInfo.access_token);
export const alertSelector = createSelector(state, ({ alert }) => alert);
