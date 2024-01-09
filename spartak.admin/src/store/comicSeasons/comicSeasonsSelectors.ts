import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const comicSeasonsState = ({ comicSeasons }: StateType) => comicSeasons;

export const comicSeasonsLoadingSelector = createSelector(comicSeasonsState, ({ isLoading }) => isLoading);
export const comicSeasonsCountSelector = createSelector(comicSeasonsState, ({ count }) => count);
export const comicSeasonsListSelector = createSelector(comicSeasonsState, ({ items }) => items);
export const comicSeasonSelector = createSelector(comicSeasonsState, ({ entity }) => entity);
