import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const dirTeamsState = ({ dirTeams }: StateType) => dirTeams;

export const dirTeamsLoadingSelector = createSelector(dirTeamsState, ({ isLoading }) => isLoading);
export const dirTeamsCountSelector = createSelector(dirTeamsState, ({ count }) => count);
export const dirTeamsSelector = createSelector(dirTeamsState, ({ teams }) => teams);
export const dirTeamSelector = createSelector(dirTeamsState, ({ team }) => team);
