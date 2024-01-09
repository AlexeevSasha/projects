import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const graduateSectionsState = ({ graduateSections }: StateType) => graduateSections;

export const graduateSectionsLoadingSelector = createSelector(graduateSectionsState, ({ isLoading }) => isLoading);
export const graduateSectionsCountSelector = createSelector(graduateSectionsState, ({ count }) => count);
export const graduateSectionsSelector = createSelector(graduateSectionsState, ({ items }) => items);
export const graduateSectionSelector = createSelector(graduateSectionsState, ({ entity }) => entity);
