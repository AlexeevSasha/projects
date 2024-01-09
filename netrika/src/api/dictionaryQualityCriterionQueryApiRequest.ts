import { BaseRequest } from "./baseRequest";
import { IQualityCriterionQueryDictionary } from "../common/interfaces/quality/IQualityCriterionQueryDictionary";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";
import { getObjectFlatter } from "../common/helpers/getObjectFlatter";

export class DictionaryQualityCriterionQueryApiRequest extends BaseRequest {
  getDictionaryWithSearch(
    pageIndex: number,
    pageSize: number,
    searchName: string
  ): Promise<IControllerResponse<IPaginateItems<IQualityCriterionQueryDictionary[]>>> {
    return this.fetch(
      `/api/DictionaryQualityCriterionQuery/quality_criterion_query/?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${encodeURIComponent(
        searchName
      )}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getQualityCriterionQueryParams(sql: string): Promise<IControllerResponse<number>> {
    return this.fetch("/api/DictionaryQualityCriterionQuery/countParams", {
      method: "POST",
      body: JSON.stringify(sql),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateQualityCriterionQuery(
    queryId: number,
    qualityCriterionQuery: IQualityCriterionQueryDictionary
  ): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/DictionaryQualityCriterionQuery/${queryId}`, {
      method: "PUT",
      body: JSON.stringify(qualityCriterionQuery),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteQualityCriterionQuery(queryId: number[]): Promise<IControllerResponse<string>> {
    const p: { [key: string]: any } = {};
    p["queryId"] = queryId;
    return this.fetch(`/api/DictionaryQualityCriterionQuery/delete?${getObjectFlatter()(p)}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createQualityCriterionQuery(
    request: IQualityCriterionQueryDictionary
  ): Promise<IControllerResponse<IQualityCriterionQueryDictionary>> {
    return this.fetch("/api/DictionaryQualityCriterionQuery", {
      method: "POST",
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
