import { createAsyncThunk } from "@reduxjs/toolkit";
import { employeeRepository } from "api/employeeRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import { Employee, EmployeeViewFilters, EmployeeResponce } from "common/interfaces/employee";

export const getEmployeeByFilter = createAsyncThunk<EmployeeResponce, EmployeeViewFilters, ThunkApiType>(
  "employee/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await employeeRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getEmployeeById = createAsyncThunk<Employee, Employee["Id"], ThunkApiType>(
  "employee/byId",
  async (id, { rejectWithValue }) => {
    return await employeeRepository.fetchById(id).catch((error) => rejectWithValue({ error }));
  }
);

export const publishEmployee = createAsyncThunk<void, Employee, ThunkApiType>(
  "employee/publish",
  async (id, { rejectWithValue }) => {
    return await employeeRepository.publish(id).catch((error) => rejectWithValue({ error }));
  }
);

export const editEmployee = createAsyncThunk<void, Omit<Employee, "Email">, ThunkApiType>(
  "employee/edit",
  async (id, { rejectWithValue }) => {
    return await employeeRepository.edit(id).catch((error) => rejectWithValue({ error }));
  }
);

export const updateEmployeeInvitation = createAsyncThunk<Employee, Employee["Id"], ThunkApiType>(
  "employee/updateInvitation",
  async (id, { rejectWithValue }) => {
    return await employeeRepository.updateInvite(id).catch((error) => rejectWithValue({ error }));
  }
);

export const deleteEmployee = createAsyncThunk<void, Employee["Id"], ThunkApiType>(
  "employee/delete",
  async (id, { rejectWithValue }) => {
    return await employeeRepository.deleteById(id).catch((error) => rejectWithValue({ error }));
  }
);
