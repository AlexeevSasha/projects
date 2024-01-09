import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const calendarState = ({ calendar }: StateType) => calendar;

export const calendarLoadingSelector = createSelector(calendarState, ({ isLoading }) => isLoading);
export const calendarCountSelector = createSelector(calendarState, ({ count }) => count);
export const calendarListSelector = createSelector(calendarState, ({ list }) => list);
export const calendarItemSelector = createSelector(calendarState, ({ item }) => item);
