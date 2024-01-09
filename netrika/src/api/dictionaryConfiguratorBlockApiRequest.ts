import { BaseRequest } from "./baseRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IConfBlockDictionary } from "../common/interfaces/dictionary/IConfBlockDictionary";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";

export class DictionaryConfiguratorBlockApiRequest extends BaseRequest {
  getDictionaryWithSearch(
    pageIndex: number,
    pageSize: number,
    searchName: string
  ): Promise<IControllerResponse<IPaginateItems<IConfBlockDictionary[]>>> {
    return this.fetch(
      `/api/DictionaryConfiguratorBlock/ConfBlock/?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${encodeURIComponent(
        searchName
      )}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateConfBlock(confBlockId: number, confBlock: IConfBlockDictionary): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/DictionaryConfiguratorBlock/${confBlockId}`, {
      method: "PUT",
      body: JSON.stringify(confBlock),
    })
      .then((response) => response?.json())
      .catch(BaseRequest.handleError);
  }
}
