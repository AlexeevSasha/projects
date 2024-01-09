import { BaseRequest } from "./baseRequest";
import { IMedicalViolations } from "../common/interfaces/medical/IMedicalViolations";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IClinrec } from "../common/interfaces/clinrec/IClinrec";
import { IPompResponse } from "../common/interfaces/IPompResponse";
import { IMedicalViolationsMonthInfo } from "../common/interfaces/medical/IMedicalViolationsMonthInfo";
import { IMedicalViolationsDayInfo } from "../common/interfaces/medical/IMedicalViolationsDayInfo";
import { IMedicalViolationsCaseDetails } from "../common/interfaces/medical/IMedicalViolationsCaseDetails";

export class AnalysisOfPatientManagementApiRequest extends BaseRequest {
  getViolations(
    registerId: number,
    patientId: string,
    config?: RequestInit
  ): Promise<IControllerResponse<IMedicalViolations>> {
    return this.fetch(
      `/api/AnalysisOfPatientManagement/AnalysisOfPatientManagementController/${registerId}/${patientId}`,
      {
        method: "GET",
        ...config,
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getClinrec(registerId: number, patientId: string, config?: RequestInit): Promise<IControllerResponse<IClinrec[]>> {
    return this.fetch(
      `/api/AnalysisOfPatientManagement/Clinrec/${registerId}/${patientId}`,

      {
        method: "GET",
        ...config,
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getPomp(registerId: number, patientId: string, config?: RequestInit): Promise<IControllerResponse<IPompResponse[]>> {
    return this.fetch(`/api/AnalysisOfPatientManagement/Pomp/${registerId}/${patientId}`, {
      method: "GET",
      ...config,
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  Calendar(
    registerId: number,
    patientId: string,
    config?: RequestInit
  ): Promise<IControllerResponse<IMedicalViolationsMonthInfo[]>> {
    return this.fetch(
      `/api/AnalysisOfPatientManagement/AnalysisOfPatientManagementController/${registerId}/${patientId}/Calendar`,

      {
        method: "GET",
        ...config,
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  CalendarMonth(
    registerId: number,
    patientId: string,
    month: number,
    year: number,
    config?: RequestInit
  ): Promise<IControllerResponse<IMedicalViolationsDayInfo[]>> {
    return this.fetch(
      `/api/AnalysisOfPatientManagement/AnalysisOfPatientManagementController/${registerId}/${patientId}/Calendar/${month}/${year}`,
      {
        method: "GET",
        ...config,
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  CalendarDay(
    registerId: number,
    patientId: string,
    month: number,
    year: number,
    day: number,
    config?: RequestInit
  ): Promise<IControllerResponse<IMedicalViolationsCaseDetails[]>> {
    return this.fetch(
      `/api/AnalysisOfPatientManagement/AnalysisOfPatientManagementController/${registerId}/${patientId}/Calendar/${month}/${year}/${day}`,
      {
        method: "GET",
        ...config,
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
