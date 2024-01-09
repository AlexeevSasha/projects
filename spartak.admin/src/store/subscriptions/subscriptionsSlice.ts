import { createSlice } from "@reduxjs/toolkit";
import { SubscriptionEntity } from "common/interfaces/subscriptions";
import { getSubscriptionById, getSubscriptionsData } from "./subscriptionsActionAsync";

export type SubscriptionsState = {
  isLoading: boolean;
  count: number;
  subscriptionData?: SubscriptionEntity[];
  subscription?: SubscriptionEntity;
};

export const subscriptionsInitialState: SubscriptionsState = {
  isLoading: false,
  count: 0,
};

export const { actions: subscriptionActions, reducer: subscriptionsReducer } = createSlice({
  name: "subscriptionsSlice",
  initialState: subscriptionsInitialState,
  reducers: {
    resetSubscription(state) {
      state.subscription = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptionsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubscriptionsData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.count = payload.count;
        state.subscriptionData = payload.subscriptions;
      })
      .addCase(getSubscriptionsData.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getSubscriptionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubscriptionById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.subscription = payload;
      })
      .addCase(getSubscriptionById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
