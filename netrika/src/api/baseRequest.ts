import { AuthService } from "module/authorization/AuthService";
import { AppSettings } from "../common/constants/appSettings";

export class BaseRequest {
  private static bearer: string;
  private static headers = new Headers();
  private readonly baseurl: string;

  constructor(url?: string, contentType?: string) {
    this.baseurl = url || AppSettings.get("REACT_APP_API_URL");

    BaseRequest.headers.set("Accept", "application/json");
    BaseRequest.headers.set("Content-Type", contentType || "application/json");
  }

  private mergeHeaders(headers?: { [key: string]: string }, body?: unknown) {
    const newHeaders = BaseRequest.headers;
    if (headers) {
      Object.entries(headers).forEach(([key, value]) => {
        newHeaders.append(key, value);
      });
    }

    const hiddenContentType = body instanceof FormData;
    hiddenContentType && newHeaders.delete("Content-Type");

    return newHeaders;
  }

  static handleError = (error: any): Promise<any> => {
    return Promise.reject(error);
  };

  static setBearer: (bearer: string) => void = (bearer) => {
    BaseRequest.bearer = bearer;
    BaseRequest.headers.set("Authorization", "Bearer " + bearer);
  };

  async fetch(url: string, config: Record<string, any>) {
    const headers = this.mergeHeaders(config?.headers, config?.body);
    const response = await fetch(this.baseurl + url, { ...config, headers });
    if (response.status === 401) {
      const authService = new AuthService();
      await authService.login();
    }
    if (!response.status || response.status < 200 || response.status >= 300) {
      throw response;
    }
    return response;
  }
}
