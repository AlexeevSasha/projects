import { BaseRequest } from "./baseRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IOrderControlList } from "../common/interfaces/order/IOrderControlList";
import { IAddOrderControlListRequest } from "../common/interfaces/order/IAddOrderControlListRequest";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";
import { IOrderControlListItem } from "../common/interfaces/order/IOrderControlListItem";

export class OrderControlListApiRequest extends BaseRequest {
  getOrderControlLists(
    orderId: number,
    pageIndex: number,
    pageSize: number
  ): Promise<IControllerResponse<IPaginateItems<IOrderControlListItem[]>>> {
    return this.fetch(`/api/OrderControlList/list/${orderId}/?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getOrderControlList(controlListId: number): Promise<IControllerResponse<IOrderControlList>> {
    return this.fetch(`/api/OrderControlList/${controlListId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createOrderControlList(request: IAddOrderControlListRequest): Promise<IControllerResponse<IOrderControlList>> {
    return this.fetch("/api/OrderControlList", {
      method: "POST",
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateOrderControlList(id: number, orderControlList: IOrderControlList): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/OrderControlList/${id}`, {
      method: "PUT",
      body: JSON.stringify(orderControlList),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteOrderControlList(id: number): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/OrderControlList/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
