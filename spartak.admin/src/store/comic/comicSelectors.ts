import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const comicState = ({ comic }: StateType) => comic;

export const comicLoadingSelector = createSelector(comicState, ({ isLoading }) => isLoading);
export const comicCountSelector = createSelector(comicState, ({ count }) => count);
export const comicListSelector = createSelector(comicState, ({ items }) => items);
export const comicSelector = createSelector(comicState, ({ entity }) => entity);
export const seasonOptinsSelector = createSelector(comicState, ({ seasons }) => seasons);
