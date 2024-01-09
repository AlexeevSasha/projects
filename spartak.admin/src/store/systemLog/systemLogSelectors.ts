import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const systemLogState = ({ systemLog }: StateType) => systemLog;

export const systemLogLoadingSelector = createSelector(systemLogState, ({ isLoading }) => isLoading);
export const systemLogCountSelector = createSelector(systemLogState, ({ count }) => count);
export const systemLogListSelector = createSelector(systemLogState, ({ logs }) => logs);
export const systemLogSelector = createSelector(systemLogState, ({ log }) => log);
