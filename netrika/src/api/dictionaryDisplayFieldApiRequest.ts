import { BaseRequest } from "./baseRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IDictionaryDisplayFieldRequest } from "../common/interfaces/dictionary/IDictionaryDisplayFieldRequest";
import {
  ICreateDisplayField,
  IDictionaryDisplayFieldForEdit,
  IDisplayFieldItem,
  IPaginateItems,
} from "../common/interfaces/dictionary/IDictionaryDisplayField";
import { IDictionaryDisplayTableField } from "../common/interfaces/dictionary/IDictionaryDisplayTableField";
import { IConfiguratorValue } from "../common/interfaces/IConfiguratorValue";

export class DictionaryDisplayFieldApiRequest extends BaseRequest {
  createDictionaryDisplayField(request: ICreateDisplayField): Promise<IControllerResponse<string>> {
    return this.fetch(
      "/api/DictionaryDisplayField/add",

      {
        method: "POST",
        body: JSON.stringify(request),
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateDictionaryDisplayField(request: ICreateDisplayField): Promise<IControllerResponse<string>> {
    return this.fetch("/api/DictionaryDisplayField/update", {
      method: "PUT",
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictionaryDisplayFieldList(
    request: IDictionaryDisplayFieldRequest
  ): Promise<IControllerResponse<IPaginateItems<IDisplayFieldItem[]>>> {
    const strSearchText = request.searchText?.length ? `&search=${encodeURIComponent(request.searchText)}` : "";
    const strFilterBizOBJ = request.bizObjName?.length ? `&bizObjName=${request.bizObjName}` : "";
    const strDescriptionAsc =
      typeof request?.descriptionAsc !== "undefined" ? `&descriptionAsc=${request.descriptionAsc}` : "";

    return this.fetch(
      `/api/DictionaryDisplayField/list/?pageIndex=${request.currentPage}&pageSize=${request.pageSize}` +
        strFilterBizOBJ +
        strSearchText +
        strDescriptionAsc,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictionaryDisplayFieldById(registerFieldId: string): Promise<IControllerResponse<IDictionaryDisplayFieldForEdit>> {
    return this.fetch(`/api/DictionaryDisplayField/${registerFieldId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getBizObjects(): Promise<IControllerResponse<{ id: number; name: string }[]>> {
    return this.fetch("/api/DictionaryDisplayField/biz-objects", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictionariesList(): Promise<IControllerResponse<IConfiguratorValue[]>> {
    return this.fetch(
      "/api/DictionaryDisplayField/dictionaries",

      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getTableFields(
    dictionaryName: string,
    registerFieldId?: number
  ): Promise<IControllerResponse<IDictionaryDisplayTableField[]>> {
    const reg = registerFieldId ? `&registerFieldId=${registerFieldId}` : "";

    return this.fetch(`/api/DictionaryDisplayField/dictionary-fields/?dictionaryName=${dictionaryName}` + reg, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getAttributes(bizObjId: number): Promise<IControllerResponse<{ id: number; name: string; description: string }[]>> {
    return this.fetch(`/api/DictionaryDisplayField/attributes/${bizObjId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteDisplayField(idList: number[]): Promise<IControllerResponse<string>> {
    return this.fetch("/api/DictionaryDisplayField/register-field", {
      method: "DELETE",
      body: JSON.stringify(idList),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
