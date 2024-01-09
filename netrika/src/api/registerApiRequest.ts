import { BaseRequest } from "./baseRequest";
import { IRegister } from "../common/interfaces/register/IRegister";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IOrderInclusionCriteria } from "../common/interfaces/order/IOrderInclusionCriteria";
import { IGetOrderCriterionListFiltersResponse } from "../common/interfaces/IGetOrderCriterionListFiltersResponse";
import { IBizObjWithFields } from "../common/interfaces/IBizObjWithFields";
import { IRegisterFieldBase } from "../common/interfaces/register/IRegisterFieldBase";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";
import { IRegisterGroupListItem } from "../common/interfaces/register/IRegisterGroupListItem";

export class RegisterApiRequest extends BaseRequest {
  getRegister(id: number): Promise<IControllerResponse<IRegister>> {
    return this.fetch(`/api/Register/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getOrderInclusionCriterion(id: number): Promise<IControllerResponse<IOrderInclusionCriteria>> {
    return this.fetch(`/api/Register/criterion/description/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getOrderCriterionList(registerId: number): Promise<IControllerResponse<IGetOrderCriterionListFiltersResponse>> {
    return this.fetch(`/api/Register/criterion/list/${registerId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getRegisterFields(): Promise<IControllerResponse<IRegisterFieldBase[]>> {
    return this.fetch("/api/Register/fields", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getRegisterBizObjWithFields(): Promise<IControllerResponse<IBizObjWithFields[]>> {
    return this.fetch("/api/Register/bizObfWithFields", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getRegisterGroups(searchString: string): Promise<IControllerResponse<IRegisterGroupListItem[]>> {
    const p: { [key: string]: any } = {};
    p["searchString="] = searchString;
    return this.fetch(`/api/Register/groups?searchString=${encodeURIComponent(searchString)}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getRegisterName(registerId: number): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/Register/registerName/${registerId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateRegisterStatusIsArchive(
    registerId: number
  ): Promise<IControllerResponse<Pick<IRegister, "registerStatusName" | "registerStatusDescription">>> {
    return this.fetch(`/api/Register/toggleArchive/${registerId}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  sendRegisterToUpdate(registerId: number): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/Register/SendRegisterToUpdate/${registerId}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteRegister(registerId: number): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/Register/DeleteRegister/${registerId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  methodSearchRegisterDictionaryValue(data: {
    pageIndex: number;
    pageSize: number;
    search: string;
    id: string;
  }): Promise<IControllerResponse<IPaginateItems<{ value: string; key: string }[]>>> {
    return this.fetch(
      `/api/Register/fieldValues/${data.id}/?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}&search=${data.search}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
