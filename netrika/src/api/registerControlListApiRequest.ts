import { BaseRequest } from "./baseRequest";
import { IControlList, SortingControlListDto } from "../common/interfaces/control/IControlList";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IGetControlListWithFilter } from "../common/interfaces/IGetControlListWithFilter";
import { IOrderQualityCriterion } from "../common/interfaces/order/IOrderQualityCriterion";
import { IConfiguratorValue } from "../common/interfaces/IConfiguratorValue";
import { IControlListWithFilter } from "../common/interfaces/control/IControlListWithFilter";
import { IControllerResponseJob } from "../common/interfaces/response/IControllerResponseJob";
import { IControlListsFields } from "../common/interfaces/control/IControlListsField";
import { IControlListsFilter } from "../common/interfaces/control/IControlListsFilter";
import {
  IRegisterFilterFields,
  IRegisterFilterFieldsFilterGroup,
} from "../common/interfaces/register/IRegisterFilterFields";
import { ITestControlList } from "../common/interfaces/ITestControlList";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";

export class RegisterControlListApiRequest extends BaseRequest {
  getControlLists(registerId: number): Promise<IControllerResponse<IControlList[]>> {
    return this.fetch(`/api/RegisterControlList/all/${registerId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  sortControlList(sortingControlList: SortingControlListDto[]): Promise<IControllerResponse<number>> {
    return this.fetch("/api/RegisterControlList/sort", {
      method: "PUT",
      body: JSON.stringify(sortingControlList),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  checkDownloadOption(): Promise<IControllerResponse<boolean>> {
    return this.fetch("/api/RegisterControlList/CheckDownloadOption", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  downloadXls(registerControlListId: number, filter?: string): Promise<any> {
    return this.fetch(
      `/api/RegisterControlList/DownloadXls/${registerControlListId}${filter ? `?filter=${filter}` : ""}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (response.headers.get("Content-Type") === "application/json; charset=utf-8") {
          return response.json();
        } else return response.blob();
      })
      .catch(BaseRequest.handleError);
  }

  downloadCsv(registerControlListId: number, filter?: string): Promise<any> {
    return this.fetch(
      `/api/RegisterControlList/DownloadCsv/${registerControlListId}${filter ? `?filter=${filter}` : ""}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (response.headers.get("Content-Type") === "application/json; charset=utf-8") {
          return response.json();
        } else return response.blob();
      })
      .catch(BaseRequest.handleError);
  }

  downloadXlsPatientCase(registerControlListId: number): Promise<any> {
    return this.fetch(`/api/RegisterControlList/DownloadXlsPatientCase/${registerControlListId}`, {
      method: "GET",
    })
      .then((response) => {
        if (response.headers.get("Content-Type") === "application/json; charset=utf-8") {
          return response.json();
        } else return response.blob();
      })
      .catch(BaseRequest.handleError);
  }

  getControlList(controlListId: number): Promise<IControllerResponse<IGetControlListWithFilter>> {
    return this.fetch(`/api/RegisterControlList/${controlListId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getControlListItemsAsync(
    controlListId: number,
    pageIndex: number,
    pageSize: number,
    filter?: string,
    orderColumn?: string,
    orderAsc?: boolean
  ): Promise<IControllerResponse<string>> {
    const search = filter ? `&search=${encodeURIComponent(filter || "")}` : "";
    const sort = orderColumn ? `&orderColumn=${orderColumn}&orderAsc=${!!orderAsc}` : "";
    return this.fetch(
      `/api/RegisterControlList/getItemsAsync/${controlListId}/?pageIndex=${pageIndex}&pageSize=${pageSize}${search}${sort}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  jobsResults(): Promise<IControllerResponse<IControllerResponseJob<any>[]>> {
    return this.fetch("/api/RegisterControlList/jobsResults", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  interruptJob(jobId: string): Promise<IControllerResponse<IControllerResponseJob<any>[]>> {
    return this.fetch(`/api/RegisterControlList/interruptJob/${jobId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getOrderQuality(
    registerId: string,
    pageIndex: number,
    pageSize: number,
    searchName?: string
  ): Promise<IControllerResponse<IPaginateItems<IOrderQualityCriterion[]>>> {
    return this.fetch(
      `/api/RegisterControlList/RegisterQualityCriterion/${registerId}/?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${searchName}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictionaryValues(
    dictionary: string,
    data?: { pageIndex?: number; pageSize?: number; search?: string; id?: string }
  ): Promise<IControllerResponse<IPaginateItems<IConfiguratorValue[]>>> {
    const paginateString =
      data?.pageIndex && data?.pageSize
        ? `?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}&search=${data.search || ""}`
        : "";

    return this.fetch(`/api/RegisterControlList/query/dictionary/${data?.id || dictionary}/${paginateString}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateControlList(controlListId: number, controlList: IControlListWithFilter): Promise<IControllerResponse<number>> {
    return this.fetch(`/api/RegisterControlList/${controlListId}`, {
      method: "PUT",
      body: JSON.stringify(controlList),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  setIsDone(controlListId: number, isDone: boolean): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/RegisterControlList/setIsDone/${controlListId}/${isDone}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createControlList(controlList: IControlListWithFilter): Promise<IControllerResponse<number>> {
    return this.fetch("/api/RegisterControlList", {
      method: "POST",
      body: JSON.stringify(controlList),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  testControlList(controlList: IControlListWithFilter): Promise<IControllerResponse<ITestControlList>> {
    return this.fetch("/api/RegisterControlList/test", {
      method: "POST",
      body: JSON.stringify(controlList),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteControlList(controlListId: number): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/RegisterControlList/${controlListId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getControlListsFields(controlListId: number): Promise<IControllerResponse<IControlListsFields>> {
    return this.fetch(`/api/RegisterControlList/Fields/${controlListId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateControlListsFields(
    controlList: IControlListsFields,
    controlListId: number
  ): Promise<IControllerResponse<IControlListsFields>> {
    return this.fetch(`/api/RegisterControlList/Fields/${controlListId}`, {
      method: "PUT",
      body: JSON.stringify(controlList),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getControlListsFilter(controlListId: number): Promise<IControllerResponse<IControlListsFilter>> {
    return this.fetch(`/api/RegisterControlList/Filter/${controlListId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateControlListsFilter(
    controlList: IControlListsFilter,
    controlListId: number
  ): Promise<IControllerResponse<IControlListsFilter>> {
    return this.fetch(`/api/RegisterControlList/Filter/${controlListId}`, {
      method: "PUT",
      body: JSON.stringify(controlList),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getRegisterDefaultFilterFields(registerId: number): Promise<IControllerResponse<IRegisterFilterFieldsFilterGroup[]>> {
    return this.fetch(`/api/Register/${registerId}/FieldsForFilter`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getRegisterFilterFields(
    registerId: string,
    controlListId: number
  ): Promise<IControllerResponse<IRegisterFilterFields>> {
    return this.fetch(`/api/RegisterControlList/RegisterFilterFields/${registerId}/${controlListId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createRegisterFilterFields(registerId: string, data: IRegisterFilterFields): Promise<IControllerResponse<number>> {
    return this.fetch(`/api/RegisterControlList/RegisterFilterFields/${registerId}`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateRegisterFilterFields(
    registerId: string,
    controlListId: number,
    data: IRegisterFilterFields
  ): Promise<IControllerResponse<number>> {
    return this.fetch(`/api/RegisterControlList/RegisterFilterFields/${registerId}/${controlListId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
