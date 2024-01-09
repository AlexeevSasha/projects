import { Employee, EmployeeViewFilters } from "common/interfaces/employee";
import { BaseApiService } from "./BaseApiService";
import { BaseResponce } from "../common/interfaces/common";

class EmployeeRepository extends BaseApiService {
  constructor() {
    super("admin");
  }

  fetchByFilter = async (filter: EmployeeViewFilters) => {
    const res = await this.get(`odata/Employee?${this.getODataQuery(filter)}`);

    return { employee: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: Employee["Id"]) => {
    const { value } = await this.get<BaseResponce<Employee[]>>(`odata/Employee?$filter=Id eq ${id}`);

    return value[0];
  };

  publish = async (entity: Employee) => await this.post("Employee/AddEmployee", JSON.stringify(entity));

  edit = async (entity: Omit<Employee, "Email">) =>
    await this.put(`Employee/UpdateEmployee?id=${entity.Id}`, JSON.stringify(entity));

  updateInvite = async (id: Employee["Id"]) => await this.put(`Employee/UpdateInvitation`, JSON.stringify(id));

  deleteById = async (id: Employee["Id"]) => await this.delete(`Employee/DeleteEmployee?id=${id}`);
}

export const employeeRepository = new EmployeeRepository();
