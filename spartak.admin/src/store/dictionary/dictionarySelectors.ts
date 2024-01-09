import { createSelector } from "@reduxjs/toolkit";
import { TeamType } from "common/interfaces/teams";
import { StateType } from "store";

export const dictionaryState = ({ dictionary }: StateType) => dictionary;

export const countriesOptionsSelector = createSelector(dictionaryState, ({ countriesOptions }) => countriesOptions);
export const citiesOptionsSelector = createSelector(dictionaryState, ({ citiesOptions }) => citiesOptions);
export const ampluaOptionsSelector = createSelector(dictionaryState, ({ ampluaOptions }) => ampluaOptions);
export const allAmpluaOptionsSelector = createSelector(dictionaryState, ({ allAmpluaOptions }) => allAmpluaOptions);
export const teamsOptionsSelector = createSelector(dictionaryState, ({ teamsOptions }) => teamsOptions);
export const ownTeamsOptionsSelector = createSelector(dictionaryState, ({ teamsOptions }) =>
  teamsOptions.filter((team) => team.TeamType === TeamType.own)
);
export const stadiumsOptionsSelector = createSelector(dictionaryState, ({ stadiumsOptions }) => stadiumsOptions);

export const tournamentsOptionsSelector = createSelector(
  dictionaryState,
  ({ tournamentsOptions }) => tournamentsOptions
);

export const seasonsOptionsSelector = createSelector(dictionaryState, ({ seasonsOptions }) => seasonsOptions);
export const userLevelsSelector = createSelector(dictionaryState, ({ userLevels }) => userLevels);
