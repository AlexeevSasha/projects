import { BaseRequest } from "./baseRequest";
import { IRegisterAttachment } from "../common/interfaces/register/IRegisterAttachment";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";

export class RegisterAttachmentApiRequest extends BaseRequest {
  getRegisterAttachments(registerId: number): Promise<IControllerResponse<IRegisterAttachment[]>> {
    return this.fetch(`/api/RegisterAttachment/list/${registerId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  downloadRegisterAttachment(id: number): Promise<any> {
    return this.fetch(`/api/RegisterAttachment/download/${id}`, {
      method: "GET",
    })
      .then((response) => {
        if (response.headers.get("Content-Type") === "application/json; charset=utf-8") {
          return response.json();
        } else return response.blob();
      })
      .catch(BaseRequest.handleError);
  }
}
