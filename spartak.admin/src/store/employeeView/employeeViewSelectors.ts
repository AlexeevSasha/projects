import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const employeeViewState = ({ employeeView }: StateType) => employeeView;

export const employeeViewLoadingSelector = createSelector(employeeViewState, ({ isLoading }) => isLoading);
export const employeeViewCountSelector = createSelector(employeeViewState, ({ count }) => count);
export const employeeListSelector = createSelector(employeeViewState, ({ employeeList }) => employeeList);
export const employeeSelector = createSelector(employeeViewState, ({ employee }) => employee);
