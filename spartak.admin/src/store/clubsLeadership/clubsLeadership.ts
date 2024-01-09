import { createSlice } from "@reduxjs/toolkit";

import { ILeadership } from "../../common/interfaces/ILeadership";
import { getClubsLeaderById, getClubsLeadershipByFilter } from "./clubsLeadershipActionAsync";

export type ClubsLeadershipState = {
  isLoading: boolean;
  count: number;
  leadership?: ILeadership[];
  leader?: ILeadership;
};

export const clubsLeadershipInitialState: ClubsLeadershipState = {
  isLoading: false,
  count: 0,
};

export const { actions: clubsLeadershipActions, reducer: clubsLeadershipReducer } = createSlice({
  name: "clubsLeadership",
  initialState: clubsLeadershipInitialState,
  reducers: {
    resetLeader(state) {
      state.leader = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClubsLeadershipByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClubsLeadershipByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.leadership = payload.leadership;
        state.isLoading = false;
      })
      .addCase(getClubsLeadershipByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getClubsLeaderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClubsLeaderById.fulfilled, (state, { payload }) => {
        state.leader = payload;
        state.isLoading = false;
      })
      .addCase(getClubsLeaderById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
