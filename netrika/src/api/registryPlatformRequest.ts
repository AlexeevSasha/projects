import { BaseRequest } from "./baseRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IManual } from "../common/interfaces/IManual";

export class RegistryPlatformRequest extends BaseRequest {
  getVersion() {
    return this.fetch("/api/RegistryPlatform/version", { method: "GET" })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getManual(): Promise<IControllerResponse<IManual>> {
    return this.fetch("/api/RegistryPlatform/manual", { method: "GET" })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  checkExistsManual(): Promise<IControllerResponse<boolean>> {
    return this.fetch("/api/RegistryPlatform/manual/exists", { method: "GET" })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  downloadManual(): Promise<Blob> {
    return this.fetch("/api/RegistryPlatform/manual/download", { method: "GET" })
      .then((response) => {
        if (response.headers.get("Content-Type") === "application/json; charset=utf-8") {
          return response.json();
        } else return response.blob();
      })
      .catch(BaseRequest.handleError);
  }

  updateManualFile(file: File): Promise<IControllerResponse<string>> {
    const body = new FormData();
    body.append("file", file);

    return this.fetch("/api/RegistryPlatform/manual/update", {
      method: "POST",
      body: body,
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
