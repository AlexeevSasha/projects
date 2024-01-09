import { BaseRequest } from "./baseRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { INsiDictionary } from "../common/interfaces/INsiDictionary";
import { IJobsResult } from "../common/interfaces/IJobsResult";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";

export class NsiDictionaryApiRequest extends BaseRequest {
  getNsiDictionary(
    pageIndex: number,
    pageSize: number,
    searchName: string,
    orderColumn: string,
    orderAsc: boolean
  ): Promise<IControllerResponse<IPaginateItems<INsiDictionary[]>>> {
    const paginateString = `?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${encodeURIComponent(searchName)}`;

    return this.fetch(
      `/api/NsiDictionaryImport/loadedDictionaries/${paginateString}&orderColumn=${orderColumn}&orderAsc=${orderAsc}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteDictionary(dictionaryOid: string): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/NsiDictionaryImport/deleteDictionary/${dictionaryOid}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateDictionaryAsync(dictionaryOid: string): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/NsiDictionaryImport/updateDictionaryAsync/${dictionaryOid}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  jobsResults(): Promise<IControllerResponse<IJobsResult<any>[]>> {
    return this.fetch("/api/NsiDictionaryImport/jobsResults/", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  interruptJob(
    jobId: string
  ): Promise<IControllerResponse<{ status: number; message: string; jobId: string; dictionaryOid: string }>> {
    return this.fetch(`/api/NsiDictionaryImport/interruptJob/${jobId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
