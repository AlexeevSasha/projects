import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const clubsTeamsState = ({ clubsTeams }: StateType) => clubsTeams;

export const clubsTeamsLoadingSelector = createSelector(clubsTeamsState, ({ isLoading }) => isLoading);
export const clubsTeamsCountSelector = createSelector(clubsTeamsState, ({ count }) => count);
export const clubsTeamsSelector = createSelector(clubsTeamsState, ({ teams }) => teams);
export const clubsTeamSelector = createSelector(clubsTeamsState, ({ team }) => team);
