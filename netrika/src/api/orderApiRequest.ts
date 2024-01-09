import { BaseRequest } from "./baseRequest";
import { IAddOrderRequest } from "../common/interfaces/order/IAddOrderRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IOrder } from "../common/interfaces/order/IOrder";
import { IOrderStatus } from "../common/interfaces/order/IOrderStatus";
import { IOrderStatusTrigger } from "../common/interfaces/order/IOrderStatusTrigger";
import { IRegisterGroup } from "../common/interfaces/register/IRegisterGroup";
import { IClinrec } from "../common/interfaces/clinrec/IClinrec";
import { IPompResponse } from "../common/interfaces/IPompResponse";
import { IVimisSystem } from "../common/interfaces/IVimisSystem";
import { IPompGraph } from "../common/interfaces/IPompGraph";
import { IOrderGroup } from "../common/interfaces/order/IOrderGroup";
import { OrderAutoCompleteColumnNameEnum } from "../common/interfaces/order/OrderAutoCompleteColumnNameEnum";
import { IGetOrdersRequest } from "../common/interfaces/IGetOrdersRequest";
import { capitalizeFirstLetter } from "../common/helpers/capitalizeFirstLetter";
import moment from "moment";
import { OrderStatusEnum } from "../common/interfaces/order/OrderStatusEnum";

export class OrderApiRequest extends BaseRequest {
  getOrders(data: IGetOrdersRequest): Promise<IControllerResponse<IOrderGroup[]>> {
    const request = {
      name: data.name ? `&Name=${data.name}` : "",
      status: data?.status ? `${data?.status?.map((i) => "&Status=" + i.value).join("")}` : "",
      userName: data.userName ? `&UserName=${data.userName}` : "",
      BDate: data.BDate ? `&BDate=${moment(data.BDate).format("YYYY-MM-DD")}` : "",
      EDate: data.EDate ? `&EDate=${moment(data.EDate).format("YYYY-MM-DD")}` : "",
      networkName: data?.networkName ? `${data?.networkName?.map((i) => "&Network=" + i.label).join("")}` : "",
    };
    const sort = `?Sort.FieldName=${capitalizeFirstLetter(data.orderColumn)}&Sort.IsAsc=${data.orderAsc}`;
    const queryParams = Object.values(request).join("");

    return this.fetch(`/api/Order/list/${sort}` + queryParams, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getOrder(id: number): Promise<IControllerResponse<IOrder>> {
    return this.fetch(`/api/Order/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getOrderAutoComplete(
    columnName: OrderAutoCompleteColumnNameEnum,
    searchFilter: string
  ): Promise<IControllerResponse<string[]>> {
    return this.fetch(`/api/Order/autoComplete/?columnName=${columnName}&searchFilter=${searchFilter}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createOrder(request: IAddOrderRequest): Promise<IControllerResponse<IOrder>> {
    return this.fetch("/api/Order", {
      method: "POST",
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateOrder(id: number, order: IOrder): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/Order/${id}`, {
      method: "PUT",
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateStatus(id: number, statusTrigger: IOrderStatusTrigger): Promise<IControllerResponse<OrderStatusEnum>> {
    return this.fetch(`/api/Order/status/${id}`, {
      method: "PUT",
      body: JSON.stringify(statusTrigger),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteOrder(id: number): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/Order/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getRegisterGroups(): Promise<IControllerResponse<IRegisterGroup[]>> {
    return this.fetch(
      "/api/Order/groups",

      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getOrderStatus(orderId: number): Promise<IControllerResponse<IOrderStatus>> {
    return this.fetch(`/api/Order/orderStatus/${orderId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getEnableNsiOption(): Promise<IControllerResponse<boolean>> {
    return this.fetch("/api/Order/getEnableNsiOption", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getPatientRouteLink(orderId: number): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/Order/GetPatientRouteLink/${orderId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  setPatientRouteLink(orderId: number, link: string): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/Order/SetPatientRouteLink/${orderId}`, {
      method: "PUT",
      body: JSON.stringify({ url: link }),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getOrderClinrec(orderId: number): Promise<IControllerResponse<IClinrec[]>> {
    return this.fetch(`/api/Order/clinrec/${orderId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getOrderPomp(orderId: number): Promise<IControllerResponse<IPompResponse[]>> {
    return this.fetch(`/api/Order/pomp/${orderId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  generateOrderClinrec(orderId: number): Promise<IControllerResponse<IClinrec[]>> {
    return this.fetch(`/api/Order/clinrec/${orderId}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  generateOrderPomp(orderId: number): Promise<IControllerResponse<IPompResponse[]>> {
    return this.fetch(`/api/Order/pomp/${orderId}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getVimisSyst(): Promise<IControllerResponse<IVimisSystem[]>> {
    return this.fetch("/api/Order/vimisSyst", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updatePompDiagram(pompGraphId: number, request: string): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/Order/pomp/diagram/${pompGraphId}`, {
      method: "POST",
      body: request,
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  generatePompDiagram(graph: IPompGraph): Promise<IControllerResponse<string>> {
    return this.fetch("/api/Order/pomp/diagram/generate", {
      method: "POST",
      body: JSON.stringify(graph),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteOrderClinrec(orderId: number, clinrecId: number): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/Order/clinrec/${orderId}/${clinrecId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteOrderPomp(orderId: number, pompId: number): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/Order/pomp/${orderId}/${pompId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  sortPompStage(
    sortArray: { idParent: number; stageId: string; orderSort: number }[]
  ): Promise<IControllerResponse<string>> {
    return this.fetch("/api/Order/pomp/sort", {
      method: "PUT",
      body: JSON.stringify(sortArray),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  sortClinrecStage(
    sortArray: { idParent: number; stageId: string; orderSort: number }[]
  ): Promise<IControllerResponse<string>> {
    return this.fetch("/api/Order/clinrec/sort", {
      method: "PUT",
      body: JSON.stringify(sortArray),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
