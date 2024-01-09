import { BaseRequest } from "./baseRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";

export class RegisterContingentApiRequest extends BaseRequest {
  getRegisterContingentIamLinks(registerId: number): Promise<IControllerResponse<[{ authUrl: string }]>> {
    return this.fetch(`/api/RegisterContingent/linksNew/${registerId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getRegisterContingentLinks(registerId: number): Promise<IControllerResponse<string[]>> {
    return this.fetch(`/api/RegisterContingent/links/${registerId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
