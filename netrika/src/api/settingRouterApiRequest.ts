import { BaseRequest } from "./baseRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IRouterVersionRequest } from "../common/interfaces/router/IRouterVersionRequest";
import { RouterRegistryRequestDto } from "../common/interfaces/router/RouterRegistryRequest.g";
import { IRouterPatientDiagnosesRequest } from "../common/interfaces/router/IRouterPatientDiagnosesRequest";
import { IRouterPatientDiagnoses } from "../common/interfaces/router/IRouterPatientDiagnoses";
import { IRouterDiagnosis } from "../common/interfaces/router/IRouterDiagnosis";

export class SettingRouterApiRequest extends BaseRequest {
  getRouterVersion(): Promise<IRouterVersionRequest> {
    return this.fetch("/api/register/version", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getAllRegisters(): Promise<RouterRegistryRequestDto[]> {
    return this.fetch("/api/RouterTool/getAllRegisters", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getAllDiagnosis(registryId: any): Promise<IRouterDiagnosis[]> {
    return this.fetch(`/api/RouterTool/getAllDiagnosis/?registryId=${registryId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createRegister(register: RouterRegistryRequestDto): Promise<RouterRegistryRequestDto> {
    return this.fetch("/api/RouterTool/createRegister", {
      method: "POST",
      body: JSON.stringify(register),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateRegister(register: RouterRegistryRequestDto): Promise<RouterRegistryRequestDto> {
    return this.fetch("/api/RouterTool/updateRegister", {
      method: "PUT",
      body: JSON.stringify(register),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createDiagnosis(diagnose: IRouterDiagnosis): Promise<IRouterDiagnosis> {
    return this.fetch("/api/RouterTool/createDiagnosis", {
      method: "POST",
      body: JSON.stringify(diagnose),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateDiagnosis(register: IRouterDiagnosis): Promise<IRouterDiagnosis> {
    return this.fetch("/api/RouterTool/updateDiagnosis", {
      method: "PUT",
      body: JSON.stringify(register),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteRegister(idList: number[]): Promise<IControllerResponse<string>> {
    return this.fetch("/api/RouterTool/deleteRegister", {
      method: "DELETE",
      body: JSON.stringify(idList),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteDiagnosis(idList: number[]): Promise<IControllerResponse<string>> {
    return this.fetch("/api/RouterTool/deleteDiagnosis", {
      method: "DELETE",
      body: JSON.stringify(idList),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  routerRegisterInfo(request: IRouterPatientDiagnosesRequest): Promise<IRouterPatientDiagnoses[]> {
    return this.fetch("/api/register/info", {
      method: "POST",
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
