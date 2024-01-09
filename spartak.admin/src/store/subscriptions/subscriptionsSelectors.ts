import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const state = ({ subscriptions }: StateType) => subscriptions;

export const subscriptionDataSelector = createSelector(state, ({ subscriptionData }) => subscriptionData);
export const subscriptionCountSelector = createSelector(state, ({ count }) => count);
export const subscriptionByIdSelector = createSelector(state, ({ subscription }) => subscription);
