import { BaseRequest } from "./baseRequest";
import { IDictionaryLogItem } from "../common/interfaces/dictionary/IDictionaryLogItem";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";

export class DictionaryLogApiRequest extends BaseRequest {
  getDictionaryLog(
    currentPage: number,
    pageSize: number,
    searchFor: string
  ): Promise<IControllerResponse<IPaginateItems<IDictionaryLogItem[]>>> {
    return this.fetch(
      `/api/DictionaryLog/logs/?pageIndex=${currentPage}&pageSize=${pageSize}&Search.Message=${encodeURIComponent(
        searchFor
      )}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
