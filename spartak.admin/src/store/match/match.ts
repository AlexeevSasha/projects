import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { Match, MatchLineUp, MatchListItem } from "common/interfaces/matches";
import i18n from "i18next";
import { SelectFieldOption } from "ui/SelectField";
import {
  draftMatch,
  getMatchById,
  getMatchEvents,
  getMatchLineUp,
  getMatchListByFilter,
  getRuStatMatches,
  getTeams,
  publishMatch,
  saveMatchLineUp,
} from "./matchActionAsync";
import { Team } from "common/interfaces/teams";

export type MatchState = {
  isLoading: boolean;
  count: number;
  matchItems?: MatchListItem[];
  match?: Match;
  lineUp?: MatchLineUp;
  teamsOptions: SelectFieldOption[];
  teamsList: Team[];
  ruStatMatches?: SelectFieldOption[];
};

export const matchInitialState: MatchState = {
  isLoading: false,
  count: 0,
  teamsOptions: [],
  teamsList: [],
};

const getMatcher =
  (action: "pending" | "fulfilled" | "rejected") =>
  ({ type }: AnyAction) =>
    [getMatchById[action].type, publishMatch[action].type, draftMatch[action].type].includes(type);

const getLineUpMatcher =
  (action: "pending" | "fulfilled" | "rejected") =>
  ({ type }: AnyAction) =>
    [getMatchLineUp[action].type, saveMatchLineUp[action].type].includes(type);

export const { actions: matchActions, reducer: matchReducer } = createSlice({
  name: "match",
  initialState: matchInitialState,
  reducers: {
    resetMatch(state) {
      state.match = undefined;
      state.lineUp = undefined;
    },
    resetRuStat(state) {
      state.ruStatMatches = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMatchListByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMatchListByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.matchItems = payload.items;
        state.isLoading = false;
      })
      .addCase(getMatchListByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getMatchEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMatchEvents.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getMatchEvents.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getTeams.fulfilled, (state, { payload }) => {
        const locale = i18n.language === "ru" ? "Ru" : "En";
        state.teamsOptions = payload.map((team) => ({
          ...team,
          label: team.ShortName?.[locale],
          value: team.Id,
        }));
        state.teamsList = payload;
      })

      .addCase(getRuStatMatches.fulfilled, (state, { payload }) => {
        // const locale = i18n.language === "ru" ? "Ru" : "En";
        state.ruStatMatches = payload.map((team) => ({
          ...team,
          label: team.MatchName,
          value: team.Id,
        }));
      })

      .addMatcher(getLineUpMatcher("pending"), (state) => {
        state.isLoading = true;
        state.lineUp = undefined;
      })
      .addMatcher(getLineUpMatcher("fulfilled"), (state, { payload }) => {
        state.lineUp = payload;
        state.isLoading = false;
      })
      .addMatcher(getLineUpMatcher("rejected"), (state) => {
        state.isLoading = false;
      })

      .addMatcher(getMatcher("pending"), (state) => {
        state.isLoading = true;
        state.match = undefined;
      })
      .addMatcher(getMatcher("fulfilled"), (state, { payload }) => {
        state.match = payload;
        state.isLoading = false;
      })
      .addMatcher(getMatcher("rejected"), (state) => {
        state.isLoading = false;
      });
  },
});
