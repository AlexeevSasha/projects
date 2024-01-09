import { createAsyncThunk } from "@reduxjs/toolkit";
import { employeeRoleRepository } from "api/employeeRoleRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import {
  EmployeeRoleFiltersType,
  EmployeeRoleResponce,
  EmployeeRoleType,
  PoliciesItem,
} from "common/interfaces/employee";

export const getEmployeeRoleByFilter = createAsyncThunk<EmployeeRoleResponce, EmployeeRoleFiltersType, ThunkApiType>(
  "employeeRole/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.Name);

    return await employeeRoleRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getEmployeeRoleById = createAsyncThunk<EmployeeRoleType, EmployeeRoleType["Id"], ThunkApiType>(
  "employeeRole/byId",
  async (id, { rejectWithValue }) => {
    return await employeeRoleRepository.fetchById(id).catch((error) => rejectWithValue({ error }));
  }
);

export const getPolicies = createAsyncThunk<PoliciesItem[], undefined, ThunkApiType>(
  "employeeRole/getPolicies",
  async (_, { rejectWithValue }) => {
    return await employeeRoleRepository.fetchPolicies().catch((error) => rejectWithValue({ error }));
  }
);

export const createEmployeeRole = createAsyncThunk<
  void,
  Omit<EmployeeRoleType, "Id" | "CreatedUtc" | "DeletedUtc">,
  ThunkApiType
>("employeeRole/publish", async (id, { rejectWithValue }) => {
  return await employeeRoleRepository.create(id).catch((error) => rejectWithValue({ error }));
});

export const updateEmployeeRole = createAsyncThunk<void, EmployeeRoleType, ThunkApiType>(
  "employeeRole/edit",
  async (id, { rejectWithValue }) => {
    return await employeeRoleRepository.update(id).catch((error) => rejectWithValue({ error }));
  }
);

export const deleteEmployeeRole = createAsyncThunk<void, EmployeeRoleType["Id"], ThunkApiType>(
  "employeeRole/delete",
  async (id, { rejectWithValue }) => {
    return await employeeRoleRepository.deleteById(id).catch((error) => rejectWithValue({ error }));
  }
);
