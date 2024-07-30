import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {
  IEmployeeReminder
} from "../../api/dto/employees/IEmployeeReminder";
import {addReminder, getAllEmployeeReminders} from "./employeeRemindersActionAsync";

export interface IEmployeeReminderInitialState{
  isLoading: boolean;
  count: number;
}

export const employeeRemindersAdapter = createEntityAdapter<IEmployeeReminder>();

export const employeeRemindersSlice = createSlice({
  name: 'employeeReminders',
  initialState: employeeRemindersAdapter.getInitialState<IEmployeeReminderInitialState>({
    isLoading: false,
    count: 0,
  }),
  reducers: {},
  extraReducers: {
    [getAllEmployeeReminders.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllEmployeeReminders.fulfilled.type]:
        (state, {payload}: PayloadAction<{allEmployeeReminders: IEmployeeReminder[]; count: number}>) => {
      state.count = payload.count;
      employeeRemindersAdapter.setAll(state, payload.allEmployeeReminders);
      state.isLoading = false;
    },
    [getAllEmployeeReminders.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [addReminder.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addReminder.fulfilled.type]: (state, {payload}: PayloadAction<IEmployeeReminder>) => {
      state.ids.unshift(payload.id);
      state.entities[payload.id] = payload;
      state.isLoading = false;
    },
    [addReminder.rejected.type]: (state) => {
      state.isLoading = false;
    },
  }
});
