import { StateType } from "../index";
import { createSelector } from "@reduxjs/toolkit";

const trainersState = ({ trainers }: StateType) => trainers;

export const trainersLoadingSelector = createSelector(trainersState, ({ isLoading }) => isLoading);
export const trainersCountSelector = createSelector(trainersState, ({ count }) => count);
export const trainersSelector = createSelector(trainersState, ({ trainers }) => trainers);
export const trainerSelector = createSelector(trainersState, ({ trainer }) => trainer);
