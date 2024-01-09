import { BaseRequest } from "./baseRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IOrderContingent } from "../common/interfaces/order/IOrderContingent";
import { INamed } from "../common/interfaces/INamed";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";
import { IConfiguratorValue } from "../common/interfaces/IConfiguratorValue";
import { IOrderContingentListItem } from "../common/interfaces/order/IOrderContingentListItem";
import { IamScriptParamDto } from "../common/interfaces/IamScriptDto";

export class OrderContingentApiRequest extends BaseRequest {
  getOrderContingents(
    orderId: number,
    pageIndex: number,
    pageSize: number
  ): Promise<IControllerResponse<IPaginateItems<IOrderContingentListItem[]>>> {
    return this.fetch(`/api/OrderContingent/list/${orderId}/?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getOrderContingentScripts(data: {
    pageIndex: number;
    pageSize: number;
    search: string;
  }): Promise<IControllerResponse<IPaginateItems<IConfiguratorValue[]>>> {
    return this.fetch(
      `/api/OrderContingent/scriptList/?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}&search=${data.search}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getIamScriptsParam(scriptId: number): Promise<IControllerResponse<IamScriptParamDto[]>> {
    return this.fetch(`/api/IamScripts/param/${scriptId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createOrderContingent(request: IOrderContingent): Promise<IControllerResponse<IOrderContingent>> {
    return this.fetch("/api/OrderContingent", {
      method: "POST",
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateOrderContingent(id: number, orderContingent: IOrderContingent): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/OrderContingent/${id}`, {
      method: "PUT",
      body: JSON.stringify(orderContingent),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteOrderContingent(id: number): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/OrderContingent/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getElementTypes(): Promise<IControllerResponse<INamed[]>> {
    return this.fetch("/api/OrderContingent/elementTypes", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
