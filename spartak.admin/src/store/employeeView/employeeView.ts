import { createSlice } from "@reduxjs/toolkit";
import { Employee } from "common/interfaces/employee";
import { getEmployeeByFilter, getEmployeeById } from "./employeeViewActionAsync";

export type EmployeeViewState = {
  isLoading: boolean;
  count: number;
  employeeList?: Employee[];
  employee?: Employee;
};

export const employeeViewInitialState: EmployeeViewState = {
  isLoading: false,
  count: 0,
};

export const { actions: employeeViewActions, reducer: employeeViewReducer } = createSlice({
  name: "employee",
  initialState: employeeViewInitialState,
  reducers: {
    resetEmployee(state) {
      state.employee = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployeeByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.employeeList = payload.employee;
        state.isLoading = false;
      })
      .addCase(getEmployeeByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getEmployeeById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployeeById.fulfilled, (state, { payload }) => {
        state.employee = payload;
        state.isLoading = false;
      })
      .addCase(getEmployeeById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
