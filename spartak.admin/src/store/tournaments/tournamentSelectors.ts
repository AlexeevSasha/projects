import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const tournamentsState = ({ tournaments }: StateType) => tournaments;

export const tournamentsLoadingSelector = createSelector(tournamentsState, ({ isLoading }) => isLoading);
export const tournamentsCountSelector = createSelector(tournamentsState, ({ count }) => count);
export const tournamentsSelector = createSelector(tournamentsState, ({ tournaments }) => tournaments);
export const tournamentSelector = createSelector(tournamentsState, ({ tournament }) => tournament);
export const tournamentTableSelector = createSelector(tournamentsState, ({ table }) => table);
