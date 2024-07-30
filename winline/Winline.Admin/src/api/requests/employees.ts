import { get, post, put, remove } from "../baseRequest";
import { generateODataQueryEmployee } from "../../core/oDataQueryBuilders/employees/generateODataQueryEmployee";
import type { IAddEmployee, IEmployee, IEmployeeFilters } from "../dto/employees/IEmployee";

export const getEmployees = async (body: IEmployeeFilters | undefined) => {
  const url = `${process.env.REACT_APP_ADMIN}/odata/Employee?${generateODataQueryEmployee(body ?? undefined)}`;
  const response = await get(url, "application/json; odata.metadata=minimal; odata.streaming=true");

  return { employees: response.value, count: response["@odata.count"] };
};

export const addNewEmployee = async (body: IAddEmployee): Promise<IEmployee> =>
  post<string>(`${process.env.REACT_APP_ADMIN}/Employee/AddEmployee`, JSON.stringify(body), "application/json");

export const updateEmployee = async (body: IAddEmployee): Promise<IEmployee> =>
  put<string>(`${process.env.REACT_APP_ADMIN}/Employee/UpdateEmployee`, JSON.stringify(body), "application/json");

export const removeEmployee = async (id: string) => remove(`${process.env.REACT_APP_ADMIN}/Employee/DeleteEmployee?id=${id}`);

export const updateEmployeeInvitation = async (id: string) =>
  put<string>(`${process.env.REACT_APP_ADMIN}/Employee/UpdateInvitation`, JSON.stringify(id), "application/json");
