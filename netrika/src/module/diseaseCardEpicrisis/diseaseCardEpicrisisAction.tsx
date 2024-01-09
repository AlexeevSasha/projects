import { IAggregates } from "common/interfaces/IAggregates";
import { IDiagnose } from "common/interfaces/IDiagnose";
import { IDiseaseCardCustomBlock } from "common/interfaces/IDiseaseCardCustomBlock";
import { IGroupDisease } from "common/interfaces/IGroupDisease";
import { IInstrumentalAnalysis } from "common/interfaces/IInstrumentalAnalysis";
import { IIntegralDiseaseEpicrisisVisible } from "common/interfaces/IIntegralDiseaseEpicrisisVisible";
import { IMedicalCareCaseResponse } from "common/interfaces/medical/IMedicalCareCaseResponse";
import { IMedOrganizationResponse } from "common/interfaces/IMedOrganizationResponse";
import { IObservation } from "common/interfaces/IObservation";
import { IReferralResponse } from "common/interfaces/IReferralResponse";
import { Moment } from "moment";
import { IPatient } from "../../common/interfaces/patient/IPatient";
import { actionCreator } from "../../store/action/actionCreator";
import { IPreferentialMedicationSupplyListResponse } from "../../common/interfaces/IPreferentialMedicationSupplyListResponse";
import { IMedicalCareCase } from "../../common/interfaces/medical/IMedicalCareCase";
import { IImmunization } from "../../common/interfaces/IImmunization";
import { IDispensary } from "../../common/interfaces/IDispensary";
import { IRemdDocumentsEvent } from "../../common/interfaces/IDiseaseCardDocument";
import { IRecipesAndCoverageResponse } from "../../common/interfaces/IRecipesAndCoverageResponse";
import { IVaccCalendarType, IVaccinationCalendar, IVaccList } from "../../common/interfaces/IVaccCalendar";
import { IReport } from "../../common/interfaces/IReport";
import { IMedicalServicesDiseaseCard } from "../../common/interfaces/medical/IMedicalServicesDiseaseCard";
import { IPatientRoute } from "../../common/interfaces/patient/IPatientRoute";

export class DiseaseCardEpicrisisAction {
  static infoVisible = actionCreator.async<null, IIntegralDiseaseEpicrisisVisible[], Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_infoVisible"
  );

  static diagnose = actionCreator.async<null, IDiagnose, Error>("DiseaseCard/IntegralDiseaseEpicrisis_diagnose");

  static services = actionCreator.async<null, IMedicalServicesDiseaseCard[], Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_services"
  );

  static medicalCareCase = actionCreator.async<null, IMedicalCareCaseResponse, Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_medicalCareCase"
  );
  static currentMedicalCareCase = actionCreator.async<null, IMedicalCareCase, Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_currnet_medicalCareCase"
  );

  static anamnesisOfLife = actionCreator.async<null, IGroupDisease["anamnesisOfLife"][], Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_anamnesisOfLife"
  );

  static anamnesisOfDisease = actionCreator.async<null, IGroupDisease["anamnesisOfDiseaseDto"][], Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_anamnesisOfDisease"
  );

  static objectiveState = actionCreator.async<null, IGroupDisease["objectiveState"][], Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_objectiveState"
  );

  static medicalOrganization = actionCreator.async<null, IMedOrganizationResponse, Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_medicalOrganization"
  );

  static referencePlan = actionCreator.async<null, IGroupDisease["referencePlan"][], Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_referencePlan"
  );

  static referrals = actionCreator.async<null, IReferralResponse | null, Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_referrals"
  );

  static instrumentalAnalysis = actionCreator.async<null, IInstrumentalAnalysis[], Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_instrumentalAnalysis"
  );

  static aggregates = actionCreator.async<null, IAggregates[], Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_aggregates"
  );

  static immunization = actionCreator.async<null, IImmunization, Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_immunization"
  );

  static dispensary = actionCreator.async<null, IDispensary[], Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_dispensary"
  );

  static documents = actionCreator.async<null, IRemdDocumentsEvent[], Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_documents"
  );
  static recipes = actionCreator.async<null, IRecipesAndCoverageResponse, Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_recipes"
  );

  static vaccinationList = actionCreator.async<null, IVaccList[], Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_vaccinationList"
  );

  static vaccCalendar = actionCreator.async<null, IVaccinationCalendar[], Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_vaccCalendar"
  );

  static vaccinationType = actionCreator.async<null, string[], Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_vaccinationType"
  );

  static vaccCalendarType = actionCreator.async<null, IVaccCalendarType[], Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_vaccCalendarType"
  );
  static reports = actionCreator.async<null, IReport[], Error>("DiseaseCard/IntegralDiseaseEpicrisis_reports");

  static customBlocks = actionCreator.async<null, IDiseaseCardCustomBlock[], Error>("DiseaseCard/CUSTOM_BLOCKS");

  static preferentialMedicationSupply = actionCreator.async<null, IPreferentialMedicationSupplyListResponse, Error>(
    "DiseaseCard/PREFERENTIAL_MEDICATION"
  );
  static clearPreferentialMedicationSupply = actionCreator("DiseaseCard/CLEAR_PREFERENTIAL_MEDICATION");

  static infoPatient = actionCreator.async<null, IPatient, Error>("DiseaseCard/PATIENT_INFO");

  static doctorCardUrl = actionCreator.async<null, string, Error>("DiseaseCard/doctorCardUrl");

  static patientRoute = actionCreator.async<null, IPatientRoute[], Error>(
    "DiseaseCard/IntegralDiseaseEpicrisis_PatientRoute"
  );

  static setDateFilter = actionCreator<{ dateType: string; date: Moment }>("DiseaseCard/SET_DATE_FILTER");
  static setOrgsFilter = actionCreator<(IObservation & { isSelect: boolean })[]>("DiseaseCard/SET_ORGS_FILTER");
  static resetFilter = actionCreator<void>("DiseaseCard/RESET_FILTER");
}
