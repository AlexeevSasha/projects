import { StateType } from "../index";
import { createSelector } from "@reduxjs/toolkit";

const matchState = ({ matching }: StateType) => matching;

export const matchingLoadingSelector = createSelector(matchState, ({ isLoading }) => isLoading);
export const matchingCountSelector = createSelector(matchState, ({ count }) => count);
export const matchingListSelector = createSelector(matchState, ({ matchingList }) => matchingList);
export const matchingSelector = createSelector(matchState, ({ matching }) => matching);
export const matchingEventsSelector = createSelector(matchState, ({ events }) => events);
export const matchingCoefficientsSelector = createSelector(matchState, ({ coefficients }) => coefficients);
