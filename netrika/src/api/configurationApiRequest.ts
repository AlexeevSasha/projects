import { BaseRequest } from "./baseRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";

export class ConfigurationApiRequest extends BaseRequest {
  getCheckControlEventsOption(): Promise<IControllerResponse<boolean>> {
    return this.fetch("/api/Configuration/CheckControlEventsOption", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getShowUserPasswordOption(): Promise<IControllerResponse<boolean>> {
    return this.fetch("/api/Configuration/GetShowUserPasswordOption", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getIemkPortalRole(): Promise<IControllerResponse<string>> {
    return this.fetch("/api/Configuration/GetIemkPortalRole", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getContingentOption(): Promise<IControllerResponse<boolean>> {
    return this.fetch("/api/Configuration/GetContingentOption", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
