import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const bestPlayerState = ({ bestPlayer }: StateType) => bestPlayer;

export const bestPlayerLoadingSelector = createSelector(bestPlayerState, ({ isLoading }) => isLoading);
export const bestPlayerCountSelector = createSelector(bestPlayerState, ({ count }) => count);
export const bestPlayerListSelector = createSelector(bestPlayerState, ({ items }) => items);
export const bestPlayerSelector = createSelector(bestPlayerState, ({ entity }) => entity);
export const mainTeamPlayersSelector = createSelector(bestPlayerState, ({ mainTeamPlayers }) => mainTeamPlayers);
export const votingMatchesSelector = createSelector(bestPlayerState, ({ matches }) => matches);
export const seasonsSelector = createSelector(bestPlayerState, ({ seasons }) => seasons);
