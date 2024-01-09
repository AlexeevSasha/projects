import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const bannersState = ({ banners }: StateType) => banners;

export const bannersLoadingSelector = createSelector(bannersState, ({ isLoading }) => isLoading);
export const bannersCountSelector = createSelector(bannersState, ({ count }) => count);
export const bannersListSelector = createSelector(bannersState, ({ bannersList }) => bannersList);
export const bannerSelector = createSelector(bannersState, ({ banner }) => banner);
export const bannerLocationOprionaSelector = createSelector(bannersState, ({ locations }) =>
  locations.map(({ Name, Id, ...rest }) => ({ label: Name, value: Id, ...rest }))
);
