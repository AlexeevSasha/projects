import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const clubsPlayersState = ({ clubsPlayers }: StateType) => clubsPlayers;

export const clubsPlayersLoadingSelector = createSelector(clubsPlayersState, ({ isLoading }) => isLoading);
export const clubsPlayersCountSelector = createSelector(clubsPlayersState, ({ count }) => count);
export const clubsPlayersSelector = createSelector(clubsPlayersState, ({ players }) => players);
export const clubsPlayerSelector = createSelector(clubsPlayersState, ({ player }) => player);
