import { BaseRequest } from "./baseRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IOrderQualityCriterion } from "../common/interfaces/order/IOrderQualityCriterion";
import { IOrderQualityCriterionBase } from "../common/interfaces/order/IOrderQualityCriterionBase";
import { IAddOrderQualityCriterionRequest } from "../common/interfaces/order/IAddOrderQualityCriterionRequest";
import {
  IOrderQualityCriterionCurrentItem,
  IOrderQualityCriterionLIstItem,
} from "../common/interfaces/order/IOrderQualityCriterionLIstItem";
import { IQualityCriterionListItem } from "../common/interfaces/quality/IQualityCriterionListItem";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";

export class OrderQualityCriterionApiRequest extends BaseRequest {
  getOrderCriterionQuality(
    orderId: number,
    pageIndex: number,
    pageSize: number
  ): Promise<IControllerResponse<IPaginateItems<IOrderQualityCriterionLIstItem[]>>> {
    return this.fetch(`/api/OrderQualityCriterion/list/${orderId}/?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getOrderCriterionQualityItem(qualityId: number): Promise<IControllerResponse<IOrderQualityCriterionCurrentItem>> {
    return this.fetch(`/api/OrderQualityCriterion/${qualityId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getOrderCriterionQualityQueryList(): Promise<IControllerResponse<IQualityCriterionListItem[]>> {
    return this.fetch("/api/OrderQualityCriterion/queryList", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getParentCriterion(orderId: number): Promise<IControllerResponse<IOrderQualityCriterionBase[]>> {
    return this.fetch(`/api/OrderQualityCriterion/parentCriterion/${orderId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createOrderQualityCriterion(
    request: IAddOrderQualityCriterionRequest
  ): Promise<IControllerResponse<IOrderQualityCriterion>> {
    return this.fetch("/api/OrderQualityCriterion", {
      method: "POST",
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateOrderQualityCriterion(
    id: number,
    qualityCriterion: IOrderQualityCriterion
  ): Promise<IControllerResponse<IOrderQualityCriterionCurrentItem>> {
    return this.fetch(`/api/OrderQualityCriterion/${id}`, {
      method: "PUT",
      body: JSON.stringify(qualityCriterion),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteOrderQualityCriterion(id: number): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/OrderQualityCriterion/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
