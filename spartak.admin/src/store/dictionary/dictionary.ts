import { createSlice } from "@reduxjs/toolkit";
import { Team } from "common/interfaces/teams";
import i18n from "i18next";
import { SelectFieldOption } from "ui/SelectField";
import {
  getAllAmplua,
  getAmplua,
  getCities,
  getCountries,
  getReferee,
  getSeasons,
  getStadiums,
  getTeams,
  getTournaments,
  getUserLevels,
} from "./dictionaryActionAsync";

export type DictionaryState = {
  citiesOptions: SelectFieldOption[];
  countriesOptions: SelectFieldOption[];
  teamsOptions: (SelectFieldOption & Team)[];
  stadiumsOptions: SelectFieldOption[];
  ampluaOptions: SelectFieldOption[];
  allAmpluaOptions: SelectFieldOption[];
  mediaCategoryOptions: SelectFieldOption[];
  playersOptions: SelectFieldOption[];
  tournamentsOptions: SelectFieldOption[];
  matchesOptions: SelectFieldOption[];
  refereeOptions: SelectFieldOption[];
  seasonsOptions: SelectFieldOption[];
  userLevels: SelectFieldOption[];
};

export const dictionaryInitialState: DictionaryState = {
  citiesOptions: [],
  countriesOptions: [],
  teamsOptions: [],
  stadiumsOptions: [],
  ampluaOptions: [],
  allAmpluaOptions: [],
  mediaCategoryOptions: [],
  playersOptions: [],
  tournamentsOptions: [],
  matchesOptions: [],
  refereeOptions: [],
  seasonsOptions: [],
  userLevels: [],
};

export const { actions: dictionaryActions, reducer: dictionaryReducer } = createSlice({
  name: "dictionary",
  initialState: dictionaryInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.fulfilled, (state, { payload }) => {
        const locale = i18n.language === "ru" ? "Ru" : "En";
        state.countriesOptions = payload.map(({ Id, Name, ...rest }) => ({
          label: Name?.[locale],
          value: Id,
          ...rest,
        }));
      })

      .addCase(getCities.fulfilled, (state, { payload }) => {
        const locale = i18n.language === "ru" ? "Ru" : "En";
        state.citiesOptions = payload.map(({ Id, Name, ...rest }) => ({
          label: Name?.[locale],
          value: Id,
          ...rest,
        }));
      })

      .addCase(getAmplua.fulfilled, (state, { payload }) => {
        const locale = i18n.language === "ru" ? "Ru" : "En";
        state.ampluaOptions = payload.map(({ Id, Name, ...rest }) => ({
          label: Name?.[locale],
          value: Id,
          ...rest,
        }));
      })

      .addCase(getAllAmplua.fulfilled, (state, { payload }) => {
        const locale = i18n.language === "ru" ? "Ru" : "En";
        state.allAmpluaOptions = payload.map(({ Id, Name, ...rest }) => ({
          label: Name?.[locale],
          value: Id,
          ...rest,
        }));
      })

      .addCase(getTeams.fulfilled, (state, { payload }) => {
        const locale = i18n.language === "ru" ? "Ru" : "En";
        state.teamsOptions = payload.map((team) => ({
          ...team,
          label: team.ShortName?.[locale],
          value: team.Id,
        }));
      })

      .addCase(getStadiums.fulfilled, (state, { payload }) => {
        const locale = i18n.language === "ru" ? "Ru" : "En";
        state.stadiumsOptions = payload.map((stadium) => ({
          ...stadium,
          label: stadium.FullName?.[locale],
          value: stadium.Id,
        }));
      })

      .addCase(getTournaments.fulfilled, (state, { payload }) => {
        const locale = i18n.language === "ru" ? "Ru" : "En";
        state.tournamentsOptions = payload.tournaments.map((tournament) => ({
          ...tournament,
          label: tournament.FullName?.[locale] || tournament.ShortName?.[locale],
          value: tournament.Id,
        }));
      })

      .addCase(getSeasons.fulfilled, (state, { payload }) => {
        const locale = i18n.language === "ru" ? "Ru" : "En";
        state.seasonsOptions = payload.seasons.map((season) => ({
          ...season,
          label: season.Name?.[locale] || season.Name?.[locale],
          value: season.Id,
        }));
      })

      .addCase(getReferee.fulfilled, (state, { payload }) => {
        const locale = i18n.language === "ru" ? "Ru" : "En";
        state.refereeOptions = payload.map((referee) => ({
          ...referee,
          label: referee.FullName?.[locale],
          value: referee.Id,
        }));
      })

      .addCase(getUserLevels.fulfilled, (state, { payload }) => {
        state.userLevels = payload.map((userLevel) => ({
          label: userLevel.Name,
          value: userLevel.Id,
        }));
      });
  },
});
