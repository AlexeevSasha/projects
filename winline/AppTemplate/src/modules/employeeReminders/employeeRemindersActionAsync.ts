import {createAsyncThunk} from "@reduxjs/toolkit";
import {message} from "antd";
import { addEmployeeReminder, getEmployeeReminders } from "../../api/requests/employeeReminders";
import type { IAddReminder, IRemindersFilters } from "../../api/dto/employees/IEmployeeReminder";
import i18next from "i18next";

export const getAllEmployeeReminders = createAsyncThunk(
  "employeeRemindersSlice/getAllEmployeeReminders",
  async (filters: IRemindersFilters) => await getEmployeeReminders(filters));

export const addReminder = createAsyncThunk(
  "employeeRemindersSlice/addReminder",
  async (dataReminder: IAddReminder) => {
      const newReminder = await addEmployeeReminder(dataReminder);
      message.success(i18next.t("success.create.reminder"));

      return newReminder;
  }
);
