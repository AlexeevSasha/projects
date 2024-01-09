import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const mediaState = ({ media }: StateType) => media;

export const mediaLoadingSelector = createSelector(mediaState, ({ isLoading }) => isLoading);
export const mediaCountSelector = createSelector(mediaState, ({ count }) => count);
export const mediaListSelector = createSelector(mediaState, ({ mediaList }) => mediaList);
export const mediaSelector = createSelector(mediaState, ({ media }) => media);
