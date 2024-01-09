import { BaseRequest } from "./baseRequest";
import { IConfGroupDictionary } from "../common/interfaces/dictionary/IConfGroupDictionary";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IDictionaryConfGroupRequest } from "../common/interfaces/dictionary/IDictionaryConfGroupRequest";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";

export class DictionaryConfGroupApiRequest extends BaseRequest {
  getDictionaryWithSearch(
    request: IDictionaryConfGroupRequest
  ): Promise<IControllerResponse<IPaginateItems<IConfGroupDictionary[]>>> {
    const strSearchText = request.searchText?.length ? `&search=${encodeURIComponent(request.searchText)}` : "";
    const strConfBlockName = request.confBlockName?.length ? `&confBlockName=${request.confBlockName}` : "";
    const strNameAsc = typeof request?.nameAsc !== "undefined" ? `&nameAsc=${request.nameAsc}` : "";

    return this.fetch(
      `/api/DictionaryConfGroup/conf_group_dictionary/?pageIndex=${request.pageIndex}&pageSize=${request.pageSize}` +
        strSearchText +
        strConfBlockName +
        strNameAsc,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateCriterionType(confGroupId: number, confGroup: IConfGroupDictionary): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/DictionaryConfGroup/${confGroupId}`, {
      method: "PUT",
      body: JSON.stringify(confGroup),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
