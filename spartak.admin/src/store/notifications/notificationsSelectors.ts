import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const noticeState = ({ notifications }: StateType) => notifications;

export const noticeLoadingSelector = createSelector(noticeState, ({ isLoading }) => isLoading);
export const noticeCountSelector = createSelector(noticeState, ({ count }) => count);
export const noticeListSelector = createSelector(noticeState, ({ items }) => items);
export const noticeSelector = createSelector(noticeState, ({ notice }) => notice);
export const deepLinksSelector = createSelector(noticeState, ({ deepLinks }) => deepLinks);
