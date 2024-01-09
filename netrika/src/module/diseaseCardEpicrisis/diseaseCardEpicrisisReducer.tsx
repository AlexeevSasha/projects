import { IAggregates } from "common/interfaces/IAggregates";
import { IDiagnose } from "common/interfaces/IDiagnose";
import { IDiseaseCardCustomBlock } from "common/interfaces/IDiseaseCardCustomBlock";
import { IGroupDisease } from "common/interfaces/IGroupDisease";
import { IInstrumentalAnalysis } from "common/interfaces/IInstrumentalAnalysis";
import { IIntegralDiseaseEpicrisisVisible } from "common/interfaces/IIntegralDiseaseEpicrisisVisible";
import { IMedicalCareCaseResponse } from "common/interfaces/medical/IMedicalCareCaseResponse";
import { IMedOrganizationResponse } from "common/interfaces/IMedOrganizationResponse";
import { IReferralResponse } from "common/interfaces/IReferralResponse";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { IPatient } from "../../common/interfaces/patient/IPatient";
import { DiseaseCardEpicrisisAction } from "./diseaseCardEpicrisisAction";
import { IPreferentialMedicationSupplyListResponse } from "../../common/interfaces/IPreferentialMedicationSupplyListResponse";
import { IMedicalCareCase } from "../../common/interfaces/medical/IMedicalCareCase";
import { IImmunization } from "../../common/interfaces/IImmunization";
import { IDispensary } from "../../common/interfaces/IDispensary";
import { IRemdDocumentsEvent } from "../../common/interfaces/IDiseaseCardDocument";
import { IRecipesAndCoverageResponse } from "../../common/interfaces/IRecipesAndCoverageResponse";
import { IVaccCalendarType, IVaccinationCalendar, IVaccList } from "common/interfaces/IVaccCalendar";
import { IReport } from "../../common/interfaces/IReport";
import { IMedicalServicesDiseaseCard } from "../../common/interfaces/medical/IMedicalServicesDiseaseCard";
import { IPatientRoute } from "../../common/interfaces/patient/IPatientRoute";

export interface IState {
  infoVisible: IIntegralDiseaseEpicrisisVisible[];
  loading: boolean;

  diagnose: IDiagnose;
  loadingDiagnose: boolean;

  medicalCareCase: IMedicalCareCaseResponse;
  loadingMedicalCareCase: boolean;

  anamnesisOfLife: IGroupDisease["anamnesisOfLife"][];
  loadingAnamnesisOfLife: boolean;

  anamnesisOfDisease: IGroupDisease["anamnesisOfDiseaseDto"][];
  loadingAnamnesisOfDisease: boolean;

  objectiveState: IGroupDisease["objectiveState"][];
  loadingObjectiveState: boolean;

  medicalOrganization: IMedOrganizationResponse;
  loadingMedOrganization: boolean;

  referencePlan: IGroupDisease["referencePlan"][];
  loadingReferencePlan: boolean;

  referrals: IReferralResponse | null;
  loadingReferral: boolean;

  customBlocks: IDiseaseCardCustomBlock[];
  loadingCustomBlocks: boolean;

  patient?: IPatient;
  error?: Error;

  instrumentalAnalysis: IInstrumentalAnalysis[];
  loadingInstrumentalAnalysis: boolean;

  aggregates: IAggregates[];
  loadingAggregates: boolean;

  preferentialMedicationSupply: IPreferentialMedicationSupplyListResponse;
  loadingPreferentialMedicationSupply: boolean;

  currentMedicalCareCase: IMedicalCareCase;
  loadingCurrentMedicalCareCase: boolean;

  immunization: IImmunization;
  loadingImmunization: boolean;

  dispensary: IDispensary[];
  loadingDispensary: boolean;

  documents: IRemdDocumentsEvent[];
  loadingDocuments: boolean;

  recipes: IRecipesAndCoverageResponse;
  loadingRecipes: boolean;

  vaccinationList: IVaccList[];
  loadingVaccinationList: boolean;

  vaccinationCalendar: IVaccinationCalendar[];
  loadingVaccinationCalendar: boolean;

  vaccinationType: string[];
  loadingVaccinationType: boolean;

  vaccCalendarType: IVaccCalendarType[];
  loadingVaccCalendarType: boolean;

  reports: IReport[];
  loadingReports: boolean;

  services: IMedicalServicesDiseaseCard[];
  loadingServices: boolean;

  doctorCardUrl: string;
  loadingDoctorCardUrl: boolean;

  patientRoute: IPatientRoute[];
  loadingPatientRoute: boolean;
}

export const InitialState: IState = {
  infoVisible: [] as IIntegralDiseaseEpicrisisVisible[],
  loading: true,

  diagnose: {} as IDiagnose,
  loadingDiagnose: false,

  medicalCareCase: {} as IMedicalCareCaseResponse,
  loadingMedicalCareCase: false,
  currentMedicalCareCase: {} as IMedicalCareCase,
  loadingCurrentMedicalCareCase: false,

  anamnesisOfLife: [] as IGroupDisease["anamnesisOfLife"][],
  loadingAnamnesisOfLife: false,

  anamnesisOfDisease: [] as IGroupDisease["anamnesisOfDiseaseDto"][],
  loadingAnamnesisOfDisease: false,

  objectiveState: [] as IGroupDisease["objectiveState"][],
  loadingObjectiveState: false,

  medicalOrganization: {} as IMedOrganizationResponse,
  loadingMedOrganization: false,

  referencePlan: [] as IGroupDisease["referencePlan"][],
  loadingReferencePlan: false,

  referrals: {} as IReferralResponse,
  loadingReferral: false,

  customBlocks: [] as IDiseaseCardCustomBlock[],
  loadingCustomBlocks: false,

  instrumentalAnalysis: [] as IInstrumentalAnalysis[],
  loadingInstrumentalAnalysis: false,

  aggregates: [] as IAggregates[],
  loadingAggregates: false,

  preferentialMedicationSupply: {} as IPreferentialMedicationSupplyListResponse,
  loadingPreferentialMedicationSupply: false,

  immunization: {} as IImmunization,
  loadingImmunization: false,

  dispensary: [] as IDispensary[],
  loadingDispensary: false,

  documents: [] as IRemdDocumentsEvent[],
  loadingDocuments: false,

  recipes: {} as IRecipesAndCoverageResponse,
  loadingRecipes: false,

  vaccinationList: [] as [],
  loadingVaccinationList: false,

  vaccinationCalendar: [],
  loadingVaccinationCalendar: false,

  vaccinationType: [],
  loadingVaccinationType: false,

  vaccCalendarType: [],
  loadingVaccCalendarType: false,

  reports: [],
  loadingReports: false,

  services: [],
  loadingServices: false,

  doctorCardUrl: "",
  loadingDoctorCardUrl: false,

  patientRoute: [],
  loadingPatientRoute: false,
};

export const diseaseCardEpicrisisReducer = reducerWithInitialState(InitialState)
  .case(DiseaseCardEpicrisisAction.infoVisible.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(DiseaseCardEpicrisisAction.infoVisible.done, (state, { result }) => ({
    ...state,
    infoVisible: result,
    loading: false,
  }))
  .case(DiseaseCardEpicrisisAction.infoVisible.failed, (state) => ({
    ...state,
    loading: false,
  }))

  .case(DiseaseCardEpicrisisAction.diagnose.started, (state) => ({
    ...state,
    loadingDiagnose: true,
  }))
  .case(DiseaseCardEpicrisisAction.diagnose.done, (state, { result }) => ({
    ...state,
    diagnose: result,
    loadingDiagnose: false,
  }))
  .case(DiseaseCardEpicrisisAction.diagnose.failed, (state) => ({
    ...state,
    loadingDiagnose: false,
  }))

  .case(DiseaseCardEpicrisisAction.medicalCareCase.started, (state) => ({
    ...state,
    loadingMedicalCareCase: true,
  }))
  .case(DiseaseCardEpicrisisAction.medicalCareCase.done, (state, { result }) => ({
    ...state,
    medicalCareCase: result,
    loadingMedicalCareCase: false,
  }))
  .case(DiseaseCardEpicrisisAction.medicalCareCase.failed, (state) => ({
    ...state,
    loadingMedicalCareCase: false,
  }))
  .case(DiseaseCardEpicrisisAction.currentMedicalCareCase.started, (state) => ({
    ...state,
    loadingCurrentMedicalCareCase: true,
  }))
  .case(DiseaseCardEpicrisisAction.currentMedicalCareCase.done, (state, { result }) => ({
    ...state,
    currentMedicalCareCase: result,
    loadingCurrentMedicalCareCase: false,
  }))
  .case(DiseaseCardEpicrisisAction.currentMedicalCareCase.failed, (state) => ({
    ...state,
    loadingCurrentMedicalCareCase: false,
  }))

  .case(DiseaseCardEpicrisisAction.anamnesisOfLife.started, (state) => ({
    ...state,
    loadingAnamnesisOfLife: true,
  }))
  .case(DiseaseCardEpicrisisAction.anamnesisOfLife.done, (state, { result }) => ({
    ...state,
    anamnesisOfLife: result,
    loadingAnamnesisOfLife: false,
  }))
  .case(DiseaseCardEpicrisisAction.anamnesisOfLife.failed, (state) => ({
    ...state,
    loadingAnamnesisOfLife: false,
  }))

  .case(DiseaseCardEpicrisisAction.anamnesisOfDisease.started, (state) => ({
    ...state,
    loadingAnamnesisOfDisease: true,
  }))
  .case(DiseaseCardEpicrisisAction.anamnesisOfDisease.done, (state, { result }) => ({
    ...state,
    anamnesisOfDisease: result,
    loadingAnamnesisOfDisease: false,
  }))
  .case(DiseaseCardEpicrisisAction.anamnesisOfDisease.failed, (state) => ({
    ...state,
    loadingAnamnesisOfDisease: false,
  }))

  .case(DiseaseCardEpicrisisAction.objectiveState.started, (state) => ({
    ...state,
    loadingObjectiveState: true,
  }))
  .case(DiseaseCardEpicrisisAction.objectiveState.done, (state, { result }) => ({
    ...state,
    objectiveState: result,
    loadingObjectiveState: false,
  }))
  .case(DiseaseCardEpicrisisAction.objectiveState.failed, (state) => ({
    ...state,
    loadingObjectiveState: false,
  }))

  .case(DiseaseCardEpicrisisAction.medicalOrganization.started, (state) => ({
    ...state,
    loadingMedOrganization: true,
  }))
  .case(DiseaseCardEpicrisisAction.medicalOrganization.done, (state, { result }) => ({
    ...state,
    medicalOrganization: result,
    loadingMedOrganization: false,
  }))
  .case(DiseaseCardEpicrisisAction.medicalOrganization.failed, (state) => ({
    ...state,
    loadingMedOrganization: false,
  }))

  .case(DiseaseCardEpicrisisAction.referencePlan.started, (state) => ({
    ...state,
    loadingReferencePlan: true,
  }))
  .case(DiseaseCardEpicrisisAction.referencePlan.done, (state, { result }) => ({
    ...state,
    referencePlan: result,
    loadingReferencePlan: false,
  }))
  .case(DiseaseCardEpicrisisAction.referencePlan.failed, (state) => ({
    ...state,
    loadingReferencePlan: false,
  }))

  .case(DiseaseCardEpicrisisAction.referrals.started, (state) => ({
    ...state,
    loadingReferral: true,
  }))
  .case(DiseaseCardEpicrisisAction.referrals.done, (state, { result }) => ({
    ...state,
    referrals: result,
    loadingReferral: false,
  }))
  .case(DiseaseCardEpicrisisAction.referrals.failed, (state) => ({
    ...state,
    loadingReferral: false,
  }))

  .case(DiseaseCardEpicrisisAction.instrumentalAnalysis.started, (state) => ({
    ...state,
    loadingInstrumentalAnalysis: true,
  }))
  .case(DiseaseCardEpicrisisAction.instrumentalAnalysis.done, (state, { result }) => ({
    ...state,
    instrumentalAnalysis: result,
    loadingInstrumentalAnalysis: false,
  }))
  .case(DiseaseCardEpicrisisAction.instrumentalAnalysis.failed, (state) => ({
    ...state,
    loadingInstrumentalAnalysis: false,
  }))

  .case(DiseaseCardEpicrisisAction.aggregates.started, (state) => ({
    ...state,
    loadingAggregates: true,
  }))
  .case(DiseaseCardEpicrisisAction.aggregates.done, (state, { result }) => ({
    ...state,
    aggregates: result,
    loadingAggregates: false,
  }))
  .case(DiseaseCardEpicrisisAction.aggregates.failed, (state) => ({
    ...state,
    loadingAggregates: false,
  }))

  .case(DiseaseCardEpicrisisAction.customBlocks.started, (state) => ({
    ...state,
    loadingCustomBlocks: true,
  }))
  .case(DiseaseCardEpicrisisAction.customBlocks.done, (state, { result }) => ({
    ...state,
    customBlocks: result,
    loadingCustomBlocks: false,
  }))
  .case(DiseaseCardEpicrisisAction.customBlocks.failed, (state) => ({
    ...state,
    loadingCustomBlocks: false,
  }))

  .case(DiseaseCardEpicrisisAction.infoPatient.started, (state) => ({
    ...state,
  }))
  .case(DiseaseCardEpicrisisAction.infoPatient.done, (state, { result }) => ({
    ...state,
    patient: result,
  }))
  .case(DiseaseCardEpicrisisAction.infoPatient.failed, (state, { error }) => ({
    ...state,
    error,
  }))
  .case(DiseaseCardEpicrisisAction.preferentialMedicationSupply.started, (state) => ({
    ...state,
    loadingPreferentialMedicationSupply: true,
  }))
  .case(DiseaseCardEpicrisisAction.preferentialMedicationSupply.done, (state, { result }) => {
    return {
      ...state,
      preferentialMedicationSupply: result,
      loadingPreferentialMedicationSupply: false,
    };
  })

  .case(DiseaseCardEpicrisisAction.preferentialMedicationSupply.failed, (state) => ({
    ...state,
    loadingPreferentialMedicationSupply: false,
  }))
  .case(DiseaseCardEpicrisisAction.clearPreferentialMedicationSupply, (state) => ({
    ...state,
    preferentialMedicationSupply: {} as IPreferentialMedicationSupplyListResponse,
    loadingPreferentialMedicationSupply: false,
  }))

  .case(DiseaseCardEpicrisisAction.immunization.started, (state) => ({
    ...state,
    loadingImmunization: true,
  }))
  .case(DiseaseCardEpicrisisAction.immunization.done, (state, { result }) => ({
    ...state,
    immunization: result,
    loadingImmunization: false,
  }))
  .case(DiseaseCardEpicrisisAction.immunization.failed, (state) => ({
    ...state,
    loadingImmunization: false,
  }))

  .case(DiseaseCardEpicrisisAction.dispensary.started, (state) => ({
    ...state,
    loadingDispensary: true,
  }))
  .case(DiseaseCardEpicrisisAction.dispensary.done, (state, { result }) => ({
    ...state,
    dispensary: result,
    loadingDispensary: false,
  }))
  .case(DiseaseCardEpicrisisAction.dispensary.failed, (state) => ({
    ...state,
    loadingDispensary: false,
  }))
  .case(DiseaseCardEpicrisisAction.documents.started, (state) => ({
    ...state,
    loadingDocuments: true,
  }))
  .case(DiseaseCardEpicrisisAction.documents.done, (state, { result }) => ({
    ...state,
    documents: result,
    loadingDocuments: false,
  }))
  .case(DiseaseCardEpicrisisAction.documents.failed, (state) => ({
    ...state,
    loadingDocuments: false,
  }))
  .case(DiseaseCardEpicrisisAction.recipes.started, (state) => ({
    ...state,
    loadingRecipes: true,
  }))
  .case(DiseaseCardEpicrisisAction.recipes.done, (state, { result }) => ({
    ...state,
    recipes: result,
    loadingRecipes: false,
  }))
  .case(DiseaseCardEpicrisisAction.recipes.failed, (state) => ({
    ...state,
    loadingRecipes: false,
  }))

  .case(DiseaseCardEpicrisisAction.vaccinationList.started, (state) => ({
    ...state,
    loadingVaccinationList: true,
  }))
  .case(DiseaseCardEpicrisisAction.vaccinationList.done, (state, { result }) => ({
    ...state,
    vaccinationList: result,
    loadingVaccinationList: false,
  }))
  .case(DiseaseCardEpicrisisAction.vaccinationList.failed, (state) => ({
    ...state,
    loadingVaccinationList: false,
  }))

  .case(DiseaseCardEpicrisisAction.vaccCalendar.started, (state) => ({
    ...state,
    loadingVaccinationCalendar: true,
  }))
  .case(DiseaseCardEpicrisisAction.vaccCalendar.done, (state, { result }) => ({
    ...state,
    vaccinationCalendar: result,
    loadingVaccinationCalendar: false,
  }))
  .case(DiseaseCardEpicrisisAction.vaccCalendar.failed, (state) => ({
    ...state,
    loadingVaccinationCalendar: false,
  }))

  .case(DiseaseCardEpicrisisAction.vaccinationType.started, (state) => ({
    ...state,
    loadingVaccinationType: true,
  }))
  .case(DiseaseCardEpicrisisAction.vaccinationType.done, (state, { result }) => ({
    ...state,
    vaccinationType: result,
    loadingVaccinationType: false,
  }))
  .case(DiseaseCardEpicrisisAction.vaccinationType.failed, (state) => ({
    ...state,
    loadingVaccinationType: false,
  }))

  .case(DiseaseCardEpicrisisAction.vaccCalendarType.started, (state) => ({
    ...state,
    loadingVaccCalendarType: true,
  }))
  .case(DiseaseCardEpicrisisAction.vaccCalendarType.done, (state, { result }) => ({
    ...state,
    vaccCalendarType: result,
    loadingVaccCalendarType: false,
  }))
  .case(DiseaseCardEpicrisisAction.vaccCalendarType.failed, (state) => ({
    ...state,
    loadingVaccCalendarType: false,
  }))
  .case(DiseaseCardEpicrisisAction.reports.started, (state) => ({
    ...state,
    loadingReports: true,
  }))
  .case(DiseaseCardEpicrisisAction.reports.done, (state, { result }) => ({
    ...state,
    reports: result,
    loadingReports: false,
  }))
  .case(DiseaseCardEpicrisisAction.reports.failed, (state) => ({
    ...state,
    loadingReports: false,
  }))
  .case(DiseaseCardEpicrisisAction.services.started, (state) => ({
    ...state,
    loadingServices: true,
  }))
  .case(DiseaseCardEpicrisisAction.services.done, (state, { result }) => ({
    ...state,
    services: result,
    loadingServices: false,
  }))
  .case(DiseaseCardEpicrisisAction.services.failed, (state) => ({
    ...state,
    loadingServices: false,
  }))
  .case(DiseaseCardEpicrisisAction.infoVisible.failed, (state) => ({
    ...state,
    loading: false,
  }))

  .case(DiseaseCardEpicrisisAction.doctorCardUrl.started, (state) => ({
    ...state,
    loadingDoctorCardUrl: true,
  }))
  .case(DiseaseCardEpicrisisAction.doctorCardUrl.done, (state, { result }) => ({
    ...state,
    doctorCardUrl: result,
    loadingDoctorCardUrl: false,
  }))
  .case(DiseaseCardEpicrisisAction.doctorCardUrl.failed, (state) => ({
    ...state,
    loadingDoctorCardUrl: false,
  }))
  .case(DiseaseCardEpicrisisAction.patientRoute.started, (state) => ({
    ...state,
    loadingPatientRoute: true,
  }))
  .case(DiseaseCardEpicrisisAction.patientRoute.done, (state, { result }) => ({
    ...state,
    patientRoute: result,
    loadingPatientRoute: false,
  }))
  .case(DiseaseCardEpicrisisAction.patientRoute.failed, (state) => ({
    ...state,
    loadingPatientRoute: false,
  }))

  .build();
