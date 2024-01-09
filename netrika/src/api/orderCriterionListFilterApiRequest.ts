import { BaseRequest } from "./baseRequest";
import { IGetOrderCriterionListFiltersResponse } from "../common/interfaces/IGetOrderCriterionListFiltersResponse";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IPutOrderCriterionListFilters } from "../common/interfaces/IPutOrderCriterionListFilters";
import { IBizObjWithFields } from "../common/interfaces/IBizObjWithFields";
import { ITestControlList } from "../common/interfaces/ITestControlList";

export class OrderCriterionListFilterApiRequest extends BaseRequest {
  getOrderCriterionListFilters(orderId: number): Promise<IControllerResponse<IGetOrderCriterionListFiltersResponse>> {
    return this.fetch(`/api/OrderCriterionListFilter/list/${orderId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateOrderCriterionListFilter(
    orderId: number,
    orderCriterionListFilterRequest: IPutOrderCriterionListFilters
  ): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/OrderCriterionListFilter/${orderId}`, {
      method: "PUT",
      body: JSON.stringify(orderCriterionListFilterRequest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  testOrderCriterionListFilter(
    orderId: number,
    orderCriterionListFilterRequest: IPutOrderCriterionListFilters
  ): Promise<IControllerResponse<ITestControlList>> {
    return this.fetch(`/api/OrderCriterionListFilter/test/${orderId}`, {
      method: "POST",
      body: JSON.stringify(orderCriterionListFilterRequest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createRegister(
    orderId: number,
    orderCriterionListFilterRequest: IPutOrderCriterionListFilters
  ): Promise<IControllerResponse<ITestControlList>> {
    return this.fetch(`/api/OrderCriterionListFilter/createRegister/${orderId}`, {
      method: "POST",
      body: JSON.stringify(orderCriterionListFilterRequest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateRegister(
    orderId: number,
    orderCriterionListFilterRequest: IPutOrderCriterionListFilters
  ): Promise<IControllerResponse<ITestControlList>> {
    return this.fetch(`/api/OrderCriterionListFilter/updateRegister/${orderId}`, {
      method: "PUT",
      body: JSON.stringify(orderCriterionListFilterRequest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getCriterionBizObj(): Promise<IControllerResponse<IBizObjWithFields[]>> {
    return this.fetch("/api/OrderCriterionListFilter/bizObject", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
