import { BaseRequest } from "./baseRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IRegisterBizObjDictionary } from "../common/interfaces/register/IRegisterBizObjDictionary";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";
import { getObjectFlatter } from "../common/helpers/getObjectFlatter";

export class DictionaryBizObjectApiRequest extends BaseRequest {
  getDictionaryWithSearch(
    pageIndex: number,
    pageSize: number,
    searchName: string
  ): Promise<IControllerResponse<IPaginateItems<IRegisterBizObjDictionary[]>>> {
    const paginateString = `?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${encodeURIComponent(searchName)}`;
    return this.fetch(`/api/DictionaryBizObject/RegisterBizObj/${paginateString}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateDictionary(bizObjId: number, bizObj: IRegisterBizObjDictionary): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/DictionaryBizObject/${bizObjId}`, {
      method: "PUT",
      body: JSON.stringify(bizObj),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteDiseaseGroup(bizObjId: number[]): Promise<IControllerResponse<string>> {
    const p: { [key: string]: any } = {};
    p["bizObjIds"] = bizObjId;
    return this.fetch(`/api/DictionaryBizObject/delete?${getObjectFlatter()(p)}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createBizObj(request: IRegisterBizObjDictionary): Promise<IControllerResponse<string>> {
    return this.fetch("/api/DictionaryBizObject", {
      method: "POST",
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
