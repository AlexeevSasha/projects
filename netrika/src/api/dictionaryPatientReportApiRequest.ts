import { IFunction } from "../common/interfaces/IFunction";
import { BaseRequest } from "./baseRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";
import { IPatientReportLogItem } from "../common/interfaces/patient/IPatientReportLogItem";

export class DictionaryPatientReportApiRequest extends BaseRequest {
  getDictionaryPatientReport(
    currentPage: number,
    pageSize: number
  ): Promise<IControllerResponse<IPaginateItems<IPatientReportLogItem[]>>> {
    return this.fetch(`/api/DictionaryPatientReport/patient_reports/??pageIndex=${currentPage}&pageSize=${pageSize}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictionaryPatientReportFunction(): Promise<IControllerResponse<IFunction[]>> {
    return this.fetch("/api/DictionaryPatientReport/iam_functions", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
