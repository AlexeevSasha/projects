import { BaseRequest } from "./baseRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IBaseDictionary } from "../common/interfaces/dictionary/IBaseDictionary";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";
import { getObjectFlatter } from "../common/helpers/getObjectFlatter";

export class DictionaryRegisterGroupApiRequest extends BaseRequest {
  getDictionaryWithSearch(
    pageIndex: number,
    pageSize: number,
    searchName: string
  ): Promise<IControllerResponse<IPaginateItems<IBaseDictionary[]>>> {
    return this.fetch(
      `/api/DictionaryRegisterGroup/registry_group_dictionary/?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${encodeURIComponent(
        searchName
      )}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateRegisterGroup(registerGroupId: number, registerGroup: IBaseDictionary): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/DictionaryRegisterGroup/${registerGroupId}`, {
      method: "PUT",
      body: JSON.stringify(registerGroup),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteRegisterGroup(registerGroupId: number[]): Promise<IControllerResponse<string>> {
    const p: { [key: string]: any } = {};
    p["registerGroupId"] = registerGroupId;
    return this.fetch(`/api/DictionaryRegisterGroup/delete?${getObjectFlatter()(p)}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createRegisterGroup(request: IBaseDictionary): Promise<IControllerResponse<string>> {
    return this.fetch("/api/DictionaryRegisterGroup", {
      method: "POST",
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
