import { BaseRequest } from "./baseRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";
import { CreateIamScriptDto, IamScriptDto, UpdateIamScriptDto } from "../common/interfaces/IamScriptDto";
import { IConfiguratorValue } from "../common/interfaces/IConfiguratorValue";
import { getObjectFlatter } from "../common/helpers/getObjectFlatter";

export class DictionaryIamScriptRequest extends BaseRequest {
  getIamScriptsParamType(): Promise<IControllerResponse<IConfiguratorValue[]>> {
    return this.fetch("/api/IamScripts/paramType", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  IamScriptsCountParams(value: string): Promise<IControllerResponse<{ paramNames: string[]; count: number }>> {
    return this.fetch("/api/IamScripts/countParams", {
      method: "POST",
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getIamScripts(
    pageIndex: number,
    pageSize: number,
    searchName: string
  ): Promise<IControllerResponse<IPaginateItems<IamScriptDto[]>>> {
    return this.fetch(
      `/api/IamScripts/scripts/?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${encodeURIComponent(searchName)}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createIamScripts(data: CreateIamScriptDto): Promise<IControllerResponse<string>> {
    return this.fetch("/api/IamScripts/create", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateIamScripts(data: UpdateIamScriptDto): Promise<IControllerResponse<string>> {
    return this.fetch("/api/IamScripts/update", {
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteIamScripts(ids: number[]): Promise<IControllerResponse<string>> {
    const p: { [key: string]: number[] } = {};
    p["ids"] = ids;
    return this.fetch(`/api/IamScripts/delete?${getObjectFlatter()(p)}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
