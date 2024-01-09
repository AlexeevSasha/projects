import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const mediaCategoryState = ({ mediaCategory }: StateType) => mediaCategory;

export const mediaCategoriesLoadingSelector = createSelector(mediaCategoryState, ({ isLoading }) => isLoading);
export const mediaCategoriesCountSelector = createSelector(mediaCategoryState, ({ count }) => count);
export const mediaCategoriesSelector = createSelector(mediaCategoryState, ({ categories }) => categories);
export const mediaCategorySelector = createSelector(mediaCategoryState, ({ category }) => category);
