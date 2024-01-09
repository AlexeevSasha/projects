import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const clubsLeadershipState = ({ clubsLeadership }: StateType) => clubsLeadership;

export const clubsLeadershipLoadingSelector = createSelector(clubsLeadershipState, ({ isLoading }) => isLoading);
export const clubsLeadershipCountSelector = createSelector(clubsLeadershipState, ({ count }) => count);
export const clubsLeadershipSelector = createSelector(clubsLeadershipState, ({ leadership }) => leadership);
export const clubsLeaderSelector = createSelector(clubsLeadershipState, ({ leader }) => leader);
