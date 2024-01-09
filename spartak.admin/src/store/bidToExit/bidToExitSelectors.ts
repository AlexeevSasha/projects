import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const bidToExitState = ({ bidToExit }: StateType) => bidToExit;

export const bidToExitLoadingSelector = createSelector(bidToExitState, ({ isLoading }) => isLoading);
export const bidToExitCountSelector = createSelector(bidToExitState, ({ count }) => count);
export const bidToExitListSelector = createSelector(bidToExitState, ({ items }) => items);
export const bidToExitSelector = createSelector(bidToExitState, ({ entity }) => entity);
