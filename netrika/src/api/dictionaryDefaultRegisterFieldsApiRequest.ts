import { BaseRequest } from "./baseRequest";
import { IDefaultRegisterFieldDictionary } from "../common/interfaces/IDefaultRegisterFieldDictionary";
import { IBaseDictionary } from "../common/interfaces/dictionary/IBaseDictionary";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IObservationJsonFields } from "../common/interfaces/IObservationJsonFields";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";
import { getObjectFlatter } from "../common/helpers/getObjectFlatter";

export class DictionaryDefaultRegisterFieldsApiRequest extends BaseRequest {
  getDictionaryWithSearch(
    pageIndex: number,
    pageSize: number,
    searchName: string
  ): Promise<IControllerResponse<IPaginateItems<IDefaultRegisterFieldDictionary[]>>> {
    return this.fetch(
      `/api/DictionaryDefaultRegisterFields/DefaultRegisterFields/?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${encodeURIComponent(
        searchName
      )}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateDictionary(
    registerFieldId: number,
    registerField: IDefaultRegisterFieldDictionary
  ): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/DictionaryDefaultRegisterFields/${registerFieldId}`, {
      method: "PUT",
      body: JSON.stringify(registerField),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteDefaultRegisterField(defaultRegisterField: number[]): Promise<IControllerResponse<string>> {
    const p: { [key: string]: any } = {};
    p["defaultRegisterField"] = defaultRegisterField;
    return this.fetch(`/api/DictionaryDefaultRegisterFields/delete?${getObjectFlatter()(p)}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createDefaultRegisterField(request: IDefaultRegisterFieldDictionary): Promise<IControllerResponse<string>> {
    return this.fetch("/api/DictionaryDefaultRegisterFields", {
      method: "POST",
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getRegistersFields(): Promise<IControllerResponse<string[]>> {
    return this.fetch(
      "/api/DictionaryDefaultRegisterFields/registers_fields",

      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getRegistersFieldsBizObj(): Promise<IControllerResponse<IBaseDictionary[]>> {
    return this.fetch(
      "/api/DictionaryDefaultRegisterFields/registers_fields_biz_obj",

      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getObservationJsonFields(codeFilter?: number): Promise<IControllerResponse<IObservationJsonFields[]>> {
    const filter = codeFilter ? `?observationCodesFiler=${codeFilter}` : "";
    return this.fetch(`/api/DictionaryDefaultRegisterFields/ObservationJsonFieldsDictionary${filter}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
