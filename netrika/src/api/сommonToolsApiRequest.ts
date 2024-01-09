import { IUser } from "common/interfaces/user/IUser";
import { BaseRequest } from "./baseRequest";
import { IConfiguratorValue } from "../common/interfaces/IConfiguratorValue";
import { IFilterComparisonOperator } from "../common/interfaces/IFilterComparisonOperator";
import { IValue } from "../common/interfaces/ValueDto.g";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";

export class CommonToolsApiRequest extends BaseRequest {
  getComparisonOperators(): Promise<IControllerResponse<IFilterComparisonOperator[]>> {
    return this.fetch("/api/CommonTools/comparisons", { method: "GET" })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getUserGroups(): Promise<IControllerResponse<IValue[]>> {
    return this.fetch("/api/CommonTools/UserGroups", { method: "GET" })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getWorkPosition(): Promise<IControllerResponse<IConfiguratorValue[]>> {
    return this.fetch("/api/CommonTools/WorkPosition", { method: "GET" })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getAvailableMoWithFilter(data: {
    pageIndex: number;
    pageSize: number;
    search: string;
  }): Promise<IControllerResponse<IPaginateItems<IConfiguratorValue[]>>> {
    return this.fetch(
      `/api/CommonTools/AvailableMoWithFilter/?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}&search=${data.search}`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getAvalableRegisterNetwork(): Promise<IControllerResponse<IValue[]>> {
    return this.fetch("/api/CommonTools/AvailableRegisterNetwork", { method: "GET" })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDoctorINfo(snils: string): Promise<IControllerResponse<IUser>> {
    return this.fetch(`/api/CommonTools/GetDoctorInfo/${snils}`, { method: "GET" })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getRoles(): Promise<IControllerResponse<IValue[]>> {
    return this.fetch("/api/CommonTools/GetRoles", { method: "GET" })
      .then((response) => response.json())

      .catch(BaseRequest.handleError);
  }
}
