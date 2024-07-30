import {get, put, post, remove} from '../baseRequest';
import {generateODataQueryRole} from "../../core/oDataQueryBuilders/employees/generateODataQueryRole";
import type {IFiltersRole} from "../dto/employees/IEmployeeRole";

export const getAllRolesEmployee = async (filters: IFiltersRole | undefined) =>
  get(`${process.env.REACT_APP_ADMIN}/odata/Role?${generateODataQueryRole(filters)}`);

export const addNewRole = async (formattedRole: any) =>
  post<string>(`${process.env.REACT_APP_ADMIN}/Role/AddRole`, JSON.stringify(formattedRole), 'application/json');

export const updateRole = async (formattedUpdatedRole: any) =>
  put<string>(`${process.env.REACT_APP_ADMIN}/Role/UpdateRole`, JSON.stringify(formattedUpdatedRole), 'application/json');

export const deleteRole = async (id: string) =>
  remove(`${process.env.REACT_APP_ADMIN}/Role/DeleteRole?id=${id}`);
