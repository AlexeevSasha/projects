import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const matchState = ({ match }: StateType) => match;

export const matchLoadingSelector = createSelector(matchState, ({ isLoading }) => isLoading);
export const matchCountSelector = createSelector(matchState, ({ count }) => count);
export const matchItemsSelector = createSelector(matchState, ({ matchItems }) => matchItems);
export const matchSelector = createSelector(matchState, ({ match }) => match);
export const lineUpSelector = createSelector(matchState, ({ lineUp }) => lineUp);
export const teamsOptionsSelector = createSelector(matchState, ({ teamsOptions }) => teamsOptions);
export const teamsListSelector = createSelector(matchState, ({ teamsList }) => teamsList);
export const ruStatMatchesSelector = createSelector(matchState, ({ ruStatMatches }) => ruStatMatches);
