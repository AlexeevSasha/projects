import { createSelector } from "@reduxjs/toolkit";
import { DefaultOptionType } from "antd/lib/select";
import { StateType } from "store";

const employeeRoleState = ({ employeeRole }: StateType) => employeeRole;

export const employeeRoleLoadingSelector = createSelector(employeeRoleState, ({ isLoading }) => isLoading);
export const employeeRoleCountSelector = createSelector(employeeRoleState, ({ count }) => count);
export const employeeRoleListSSelector = createSelector(employeeRoleState, ({ roleList }) => roleList);
export const employeeRoleSelector = createSelector(employeeRoleState, ({ role }) => role);
export const employeeRoleAccessSelector = createSelector(employeeRoleState, ({ policies }) => policies);
