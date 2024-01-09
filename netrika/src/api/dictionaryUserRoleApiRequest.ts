import { BaseRequest } from "./baseRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IDictionaryUserRole } from "../common/interfaces/dictionary/IDictionaryUserRole";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";
import { getObjectFlatter } from "../common/helpers/getObjectFlatter";

export class DictionaryUserRoleApiRequest extends BaseRequest {
  getUserRoleyWithSearch(
    pageIndex: number,
    pageSize: number,
    searchName: string
  ): Promise<IControllerResponse<IPaginateItems<IDictionaryUserRole[]>>> {
    return this.fetch(
      `/api/DictionaryUserRole/UserRoles/?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${encodeURIComponent(
        searchName
      )}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createUserRole(userRole: IDictionaryUserRole): Promise<IControllerResponse<string>> {
    return this.fetch("/api/DictionaryUserRole/UserRole", {
      method: "POST",
      body: JSON.stringify(userRole),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateUserRole(userRole: IDictionaryUserRole, roleId: number): Promise<IControllerResponse<string>> {
    return this.fetch(
      `/api/DictionaryUserRole/UserRole/${roleId}`,

      {
        method: "PUT",
        body: JSON.stringify(userRole),
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteUserRole(roleId: number[]): Promise<IControllerResponse<string>> {
    const p: { [key: string]: any } = {};
    p["roleId"] = roleId;
    return this.fetch(`/api/DictionaryUserRole/UserRole?${getObjectFlatter()(p)}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
