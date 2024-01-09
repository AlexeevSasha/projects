import { BaseRequest } from "./baseRequest";
import { IAggregates } from "../common/interfaces/IAggregates";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IDiagnose } from "../common/interfaces/IDiagnose";
import { IDiseaseCardCustomBlock } from "../common/interfaces/IDiseaseCardCustomBlock";
import { IGroupDisease } from "../common/interfaces/IGroupDisease";
import { IInstrumentalAnalysis } from "../common/interfaces/IInstrumentalAnalysis";
import { IIntegralDiseaseEpicrisisVisible } from "../common/interfaces/IIntegralDiseaseEpicrisisVisible";
import { IMedicalCareCaseResponse } from "../common/interfaces/medical/IMedicalCareCaseResponse";
import { IMedOrganizationResponse } from "../common/interfaces/IMedOrganizationResponse";
import { IPatient } from "../common/interfaces/patient/IPatient";
import { IReferralResponse } from "../common/interfaces/IReferralResponse";
import { IPreferentialMedicationSupplyListResponse } from "../common/interfaces/IPreferentialMedicationSupplyListResponse";
import { IMedicalCareCase } from "../common/interfaces/medical/IMedicalCareCase";
import { IImmunization } from "../common/interfaces/IImmunization";
import { IDispensary } from "../common/interfaces/IDispensary";
import { IRemdDocumentsResponse } from "../common/interfaces/IDiseaseCardDocument";
import { IRecipesAndCoverageResponse } from "../common/interfaces/IRecipesAndCoverageResponse";
import {
  IVaccCalendarResponse,
  IVaccCalendarTypeResponse,
  IVaccinationResponse,
  IVaccTypeResponse,
} from "../common/interfaces/IVaccCalendar";
import { IReport } from "../common/interfaces/IReport";
import { IMedicalServicesDiseaseCard } from "../common/interfaces/medical/IMedicalServicesDiseaseCard";
import { IPatientRoute } from "../common/interfaces/patient/IPatientRoute";

export class IntegralDiseaseEpicrisisApiRequest extends BaseRequest {
  getVisibleOptions(registerId: number): Promise<IControllerResponse<IIntegralDiseaseEpicrisisVisible[]>> {
    return this.fetch(`/api/IntegralDiseaseEpicrisis/diseaseCard/GetVisibleOptions/${registerId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getPatient(registerId: number, patientId: string): Promise<IControllerResponse<IPatient>> {
    return this.fetch(
      `/api/IntegralDiseaseEpicrisis/getPatient/${registerId}/${patientId}`,

      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getPatientDoctorCardUrl(
    registerId: number,
    patientId: string
  ): Promise<IControllerResponse<{ doctorPortalCardUrl: string }>> {
    return this.fetch(
      `/api/IntegralDiseaseEpicrisis/getPatientDoctorCardUrl/${registerId}/${patientId}`,

      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDiagnosis(registerId: number, patientId: string): Promise<IControllerResponse<IDiagnose>> {
    return this.fetch(
      `/api/IntegralDiseaseEpicrisis/diseaseCard/Diagnose/${registerId}/${patientId}`,

      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
  getServices(registerId: number, patientId: string): Promise<IControllerResponse<IMedicalServicesDiseaseCard[]>> {
    return this.fetch(`/api/IntegralDiseaseEpicrisis/diseaseCard/Service/${registerId}/${patientId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getViewDocument(attachmentKey: string): Promise<Blob | IControllerResponse<any>> {
    return this.fetch(
      `/api/IntegralDiseaseEpicrisis/ViewDocument/${attachmentKey}`,

      {
        method: "GET",
      }
    )
      .then((response) => {
        if (response.headers.get("Content-Type") === "application/json; charset=utf-8") {
          return response.json();
        } else return response.blob();
      })
      .catch(BaseRequest.handleError);
  }
  getMedicalCareCase(registerId: number, patientId: string): Promise<IControllerResponse<IMedicalCareCaseResponse>> {
    return this.fetch(
      `/api/IntegralDiseaseEpicrisis/diseaseCard/MedicalCareCase/${registerId}/${patientId}`,

      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
  getMedicalCareCaseNew(caseBizKey: number): Promise<IControllerResponse<IMedicalCareCase>> {
    return this.fetch(`/api/MedicalCareCaseCard/getMedicalCareCase/${caseBizKey}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getAnamnesOfLive(
    registerId: number,
    patientId: string
  ): Promise<IControllerResponse<IGroupDisease["anamnesisOfLife"][]>> {
    return this.fetch(`/api/IntegralDiseaseEpicrisis/diseaseCard/AnamnesOfLive/${registerId}/${patientId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getAnamnesisOfDiseases(
    registerId: number,
    patientId: string
  ): Promise<IControllerResponse<IGroupDisease["anamnesisOfDiseaseDto"][]>> {
    return this.fetch(`/api/IntegralDiseaseEpicrisis/diseaseCard/AnamnesisOfDisease/${registerId}/${patientId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getObjectiveStates(
    registerId: number,
    patientId: string
  ): Promise<IControllerResponse<IGroupDisease["objectiveState"][]>> {
    return this.fetch(`/api/IntegralDiseaseEpicrisis/diseaseCard/ObjectiveStates/${registerId}/${patientId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getMedOrganization(registerId: number, patientId: string): Promise<IControllerResponse<IMedOrganizationResponse>> {
    return this.fetch(`/api/IntegralDiseaseEpicrisis/diseaseCard/MedOrganization/${registerId}/${patientId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getReferencePlan(
    registerId: number,
    patientId: string
  ): Promise<IControllerResponse<IGroupDisease["referencePlan"][]>> {
    return this.fetch(`/api/IntegralDiseaseEpicrisis/diseaseCard/ReferencePlan/${registerId}/${patientId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getReferral(registerId: number, patientId: string): Promise<IControllerResponse<IReferralResponse | null>> {
    return this.fetch(`/api/IntegralDiseaseEpicrisis/diseaseCard/Referral/${registerId}/${patientId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getInstrumentalAnalysis(
    registerId: number,
    patientId: string
  ): Promise<IControllerResponse<IInstrumentalAnalysis[]>> {
    return this.fetch(`/api/IntegralDiseaseEpicrisis/diseaseCard/InstrumentalAnalysis/${registerId}/${patientId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getAggregates(registerId: number, patientId: string): Promise<IControllerResponse<IAggregates[]>> {
    return this.fetch(`/api/IntegralDiseaseEpicrisis/diseaseCard/Aggregates/${registerId}/${patientId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getPatientRouteLink(
    registerId: number,
    patientId: string
  ): Promise<IControllerResponse<{ authUrl: string; workUrl: string }>> {
    return this.fetch(`/api/IntegralDiseaseEpicrisis/diseaseCard/PatientRouteLink/${registerId}/${patientId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getCustomBlocks(
    registerId: number,
    patientId: string,
    orderConfBlockId: number
  ): Promise<IControllerResponse<IDiseaseCardCustomBlock>> {
    return this.fetch(
      `/api/IntegralDiseaseEpicrisis/diseaseCard/CustomBlocks/${registerId}/${patientId}/${orderConfBlockId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getPreferentialMedicationSupply(
    registerId: number,
    patientId: string
  ): Promise<IControllerResponse<IPreferentialMedicationSupplyListResponse>> {
    return this.fetch(
      `/api/IntegralDiseaseEpicrisis/diseaseCard/PreferentialMedicationSupply/${registerId}/${patientId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getImmunization(registerId: number, patientId: string): Promise<IControllerResponse<IImmunization>> {
    return this.fetch(`/api/IntegralDiseaseEpicrisis/diseaseCard/Immunization/${registerId}/${patientId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
  getDispensary(
    registerId: number,
    patientId: string
  ): Promise<IControllerResponse<{ dispensaryList: IDispensary[] }>> {
    return this.fetch(`/api/IntegralDiseaseEpicrisis/diseaseCard/Dispensary/${registerId}/${patientId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
  getDocuments(registerId: number, patientId: string): Promise<IControllerResponse<IRemdDocumentsResponse>> {
    return this.fetch(`/api/IntegralDiseaseEpicrisis/diseaseCard/Documents/${registerId}/${patientId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
  getRecipes(registerId: number, patientId: string): Promise<IControllerResponse<IRecipesAndCoverageResponse>> {
    return this.fetch(`/api/IntegralDiseaseEpicrisis/diseaseCard/Recipes/${registerId}/${patientId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getVaccCalendar(registerId: number, patientId: string): Promise<IControllerResponse<IVaccinationResponse>> {
    return this.fetch(`/api/IntegralDiseaseEpicrisis/diseaseCard/VaccCalendar/${registerId}/${patientId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictVaccCalendar(): Promise<IControllerResponse<IVaccCalendarResponse>> {
    return this.fetch("/api/IntegralDiseaseEpicrisis/diseaseCard/VaccCalendar/DictVaccCalendar", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictVaccType(): Promise<IControllerResponse<IVaccTypeResponse>> {
    return this.fetch("/api/IntegralDiseaseEpicrisis/diseaseCard/VaccCalendar/DictVaccType", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictVaccCalendarType(): Promise<IControllerResponse<IVaccCalendarTypeResponse>> {
    return this.fetch("/api/IntegralDiseaseEpicrisis/diseaseCard/VaccCalendar/DictVaccCalendarType", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
  getTmReports(registerId: number, patientId: string): Promise<IControllerResponse<{ reports: IReport[] }>> {
    return this.fetch(`/api/IntegralDiseaseEpicrisis/diseaseCard/TmReports/${registerId}/${patientId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
  getPatientRoute(registerId: number, patientId: string): Promise<IControllerResponse<IPatientRoute[]>> {
    return this.fetch(`/api/IntegralDiseaseEpicrisis/diseaseCard/PatientRoute/${registerId}/${patientId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
