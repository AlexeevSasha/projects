import { createSlice } from "@reduxjs/toolkit";
import { CheckboxOptionType } from "antd";
import { EmployeeRoleType } from "common/interfaces/employee";
import { t } from "i18next";
import { getEmployeeRoleByFilter, getEmployeeRoleById, getPolicies } from "./employeeRoleActionAsync";

export type EmployeeRoleState = {
  isLoading: boolean;
  count: number;
  roleList?: EmployeeRoleType[];
  role?: EmployeeRoleType;
  policies: CheckboxOptionType[];
};

export const employeeRoleInitialState: EmployeeRoleState = {
  isLoading: false,
  count: 0,
  policies: [],
};

export const { actions: employeeRoleActions, reducer: employeeRoleReducer } = createSlice({
  name: "employeeRole",
  initialState: employeeRoleInitialState,
  reducers: {
    resetRole(state) {
      state.role = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeRoleByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployeeRoleByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.roleList = payload.roleList;
        state.isLoading = false;
      })
      .addCase(getEmployeeRoleByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getEmployeeRoleById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployeeRoleById.fulfilled, (state, { payload }) => {
        state.role = payload;
        state.isLoading = false;
      })
      .addCase(getEmployeeRoleById.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getPolicies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPolicies.fulfilled, (state, { payload }) => {
        state.policies = payload.reduce((acc: CheckboxOptionType[], { policies }) => {
          policies.forEach(({ value }) => acc.push({ value, label: t(`roles.policies.${value}`) }));

          return acc;
        }, []);
        state.isLoading = false;
      })
      .addCase(getPolicies.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
