import { EmployeeRoleFiltersType, EmployeeRoleType, PoliciesItem } from "common/interfaces/employee";
import { BaseApiService } from "./BaseApiService";
import { BaseResponce } from "../common/interfaces/common";

class EmployeeRoleRepository extends BaseApiService {
  constructor() {
    super("admin");
  }

  fetchByFilter = async (filter: EmployeeRoleFiltersType) => {
    const res = await this.get<BaseResponce<EmployeeRoleType[]>>(`odata/Role?${this.getODataQuery(filter)}`);

    return { roleList: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: EmployeeRoleType["Id"]) => {
    const { value } = await this.get<BaseResponce<EmployeeRoleType[]>>(`odata/Role?$filter=Id eq ${id}`);

    return value[0];
  };

  fetchPolicies = async () => await this.get<PoliciesItem[]>(`Role/GetPolicies`);

  create = async (role: Omit<EmployeeRoleType, "Id" | "CreatedUtc" | "DeletedUtc">) =>
    await this.post(`Role/AddRole`, JSON.stringify(role));

  update = async (role: EmployeeRoleType) => await this.put(`Role/UpdateRole`, JSON.stringify(role));

  deleteById = async (id: EmployeeRoleType["Id"]) => await this.delete(`Role/DeleteRole?id=${id}`);
}

export const employeeRoleRepository = new EmployeeRoleRepository();
