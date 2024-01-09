import { BaseRequest } from "./baseRequest";
import { IOrderInclusionCriteria } from "../common/interfaces/order/IOrderInclusionCriteria";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";

export class OrderInclusionCriteriaApiRequest extends BaseRequest {
  getOrderInclusionCriteria(id: number): Promise<IControllerResponse<IOrderInclusionCriteria>> {
    return this.fetch(`/api/OrderInclusionCriteria/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateOrderInclusionCriteria(id: number, orderInclusionCriteria: string): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/OrderInclusionCriteria/${id}`, {
      method: "PUT",
      body: JSON.stringify(orderInclusionCriteria),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
