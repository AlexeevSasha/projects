import { BaseRequest } from "./baseRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IBaseDictionary } from "../common/interfaces/dictionary/IBaseDictionary";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";
import { getObjectFlatter } from "../common/helpers/getObjectFlatter";

export class DictionaryUserGroupApiRequest extends BaseRequest {
  getUserGroupsWithSearch(
    pageIndex: number,
    pageSize: number,
    searchName: string
  ): Promise<IControllerResponse<IPaginateItems<IBaseDictionary[]>>> {
    return this.fetch(
      `/api/DictionaryUserGroup/UserGroups/?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${encodeURIComponent(
        searchName
      )}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createUserGroup(userGroup: IBaseDictionary): Promise<IControllerResponse<string>> {
    return this.fetch("/api/DictionaryUserGroup/UserGroup", {
      method: "POST",
      body: JSON.stringify(userGroup),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateUserGroup(userGroup: IBaseDictionary, groupId: number): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/DictionaryUserGroup/UserGroup/${groupId}`, {
      method: "PUT",
      body: JSON.stringify(userGroup),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteUserGroup(groupId: number[]): Promise<IControllerResponse<string>> {
    const p: { [key: string]: any } = {};
    p["groupId"] = groupId;
    return this.fetch(`/api/DictionaryUserGroup/UserGroup?${getObjectFlatter()(p)}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
