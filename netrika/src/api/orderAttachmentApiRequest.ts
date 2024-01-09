import { BaseRequest } from "./baseRequest";
import { IOrderAttachment } from "../common/interfaces/order/IOrderAttachment";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IAddOrderAttachmentRequest } from "../common/interfaces/order/IAddOrderAttachmentRequest";

export class OrderAttachmentApiRequest extends BaseRequest {
  getOrderAttachments(orderId: number): Promise<IControllerResponse<IOrderAttachment[]>> {
    return this.fetch(`/api/OrderAttachment/list/${orderId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  downloadOrderAttachment(id: number): Promise<any> {
    return this.fetch(`/api/OrderAttachment/download/${id}`, {
      method: "GET",
    })
      .then((response) => {
        if (response.headers.get("Content-Type") === "application/json; charset=utf-8") {
          return response.json();
        } else return response.blob();
      })
      .catch(BaseRequest.handleError);
  }

  addOrderAttachment(request: IAddOrderAttachmentRequest, file: File): Promise<IControllerResponse<IOrderAttachment>> {
    const body = new FormData();

    body.append("file", file);
    body.append("request", JSON.stringify(request));
    return this.fetch("/api/OrderAttachment", {
      method: "POST",
      body: body,
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteOrderAttachment(id: number): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/OrderAttachment/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
