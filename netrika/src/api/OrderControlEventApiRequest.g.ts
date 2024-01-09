import { BaseRequest } from "./baseRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IOrderControlEvent } from "../common/interfaces/order/IOrderControlEvent";
import { IAddOrderControlEventRequest } from "../common/interfaces/order/IAddOrderControlEventRequest";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";
import { IOrderControlEventListItem } from "../common/interfaces/order/IOrderControlEventListItem";

export class OrderControlEventApiRequest extends BaseRequest {
  getOrderControlEvents(
    orderId: number,
    pageIndex: number,
    pageSize: number
  ): Promise<IControllerResponse<IPaginateItems<IOrderControlEventListItem[]>>> {
    return this.fetch(`/api/OrderControlEvent/list/${orderId}/?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createOrderControlEvent(request: IAddOrderControlEventRequest): Promise<IControllerResponse<IOrderControlEvent>> {
    return this.fetch("/api/OrderControlEvent", {
      method: "POST",
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateOrderControlEvent(id: number, controlEvent: IOrderControlEvent): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/OrderControlEvent/${id}`, {
      method: "PUT",
      body: JSON.stringify(controlEvent),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteOrderControlEvent(id: number): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/OrderControlEvent/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
