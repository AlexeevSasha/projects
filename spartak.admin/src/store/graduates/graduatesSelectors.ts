import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const graduatesState = ({ graduates }: StateType) => graduates;

export const graduatesLoadingSelector = createSelector(graduatesState, ({ isLoading }) => isLoading);
export const graduatesCountSelector = createSelector(graduatesState, ({ count }) => count);
export const graduatesSelector = createSelector(graduatesState, ({ items }) => items);
export const graduateSelector = createSelector(graduatesState, ({ entity }) => entity);
export const graduateSectionOptionsSelector = createSelector(graduatesState, ({ sections }) => sections);
