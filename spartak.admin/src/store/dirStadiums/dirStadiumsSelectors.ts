import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const dirStadiumsState = ({ dirStadiums }: StateType) => dirStadiums;

export const dirStadiumsLoadingSelector = createSelector(dirStadiumsState, ({ isLoading }) => isLoading);
export const dirStadiumsCountSelector = createSelector(dirStadiumsState, ({ count }) => count);
export const dirStadiumsSelector = createSelector(dirStadiumsState, ({ stadiums }) => stadiums);
export const dirStadiumSelector = createSelector(dirStadiumsState, ({ stadium }) => stadium);
