import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import i18next from "i18next";
import { getAllRolesEmployee, addNewRole, updateRole, deleteRole } from "../../api/requests/employeeRoles";
import { pickPoliciesNameRoleInArray } from "../../common/helpers/employees/pickPoliciesNameRoleInArray";
import { addNonePolicy } from "../../common/helpers/employees/operationsWithPolicyNone";
import type { IAddEmployeeRole, IEmployeeRole, IFiltersRole } from "../../api/dto/employees/IEmployeeRole";
import type { StateType } from "../../core/redux/store";
import camelcaseKeys from "camelcase-keys";

export const getAllEmployeeRoles = createAsyncThunk(
  "employeeRoles/getEmployeeRoles",
  async (filters: IFiltersRole | undefined, { getState }) => {
    const response = await getAllRolesEmployee(filters);
    const roles = camelcaseKeys<IEmployeeRole[]>(response.value);
    const idsRoleAccess = (getState() as StateType).roleAccess.ids;
    roles.forEach((role) => addNonePolicy(role, idsRoleAccess));

    return { roles, count: response["@odata.count"] };
  }
);

export const addEmployeeRole = createAsyncThunk("employeeRoles/addEmployeeRole", async (dataRole: IAddEmployeeRole, { getState }) => {
  const formattedRole = pickPoliciesNameRoleInArray(dataRole);
  const newRole = await addNewRole(formattedRole);
  const idsRoleAccess = (getState() as StateType).roleAccess.ids;
  addNonePolicy(newRole, idsRoleAccess);
  message.success(i18next.t("success.create.role"));

  return newRole;
});

export const updateEmployeeRole = createAsyncThunk("employeeRoles/updateEmployeeRole", async (dataRole: IEmployeeRole, { getState }) => {
  const formattedUpdatedRole = pickPoliciesNameRoleInArray(dataRole);
  const updatedEmployeeRole: IEmployeeRole = await updateRole(formattedUpdatedRole);
  const idsRoleAccess = (getState() as StateType).roleAccess.ids;
  addNonePolicy(updatedEmployeeRole, idsRoleAccess);
  message.success(i18next.t("success.update.role"));

  return updatedEmployeeRole;
});

export const deleteEmployeeRole = createAsyncThunk("employeeRoles/deleteEmployeeRole", async (id: string) => {
  await deleteRole(id);
  message.success(i18next.t("success.delete.role"));

  return id;
});
