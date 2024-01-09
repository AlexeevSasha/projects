import { BaseRequest } from "./baseRequest";
import { ILoginResponse } from "../common/interfaces/ILoginResponse";
import { IAppSettingsRequest } from "../common/interfaces/IAppSettingsRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";

export class AuthorizationApiRequest extends BaseRequest {
  logout(): Promise<IControllerResponse<any>> {
    return this.fetch("/api/Authorization/logout", {
      method: "GET",
    }).catch(BaseRequest.handleError);
  }

  login(): Promise<IControllerResponse<ILoginResponse[]>> {
    return this.fetch("/api/Authorization/login", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getAppSettings(): Promise<IControllerResponse<IAppSettingsRequest>> {
    return this.fetch("/api/Authorization/appSettings", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  //TODO, Временное, очень плохое решение. Нужно для  сквозной авторизации если  от портала врача в каках пишется неполный токен, удалить полсе того, как поправят на портале врача
  getAppToken(): Promise<any> {
    return this.fetch("/connect/token", {
      method: "POST",

      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic cnBfY2xpZW50OnBhc3N3b3Jk",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: "grant_type=password&username=FromIEMKPortal&password=Bksq80mvhn&scope=openid profile",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
