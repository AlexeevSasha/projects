import { IntegralDiseaseEpicrisisApiRequest } from "api/integralDiseaseEpicrisisApiRequest";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { DiseaseCardEpicrisisAction } from "./diseaseCardEpicrisisAction";
import { errorPopup } from "../../common/helpers/toast/error";

export const DiseaseCardEpicrisisThunk = {
  getVisible(registerId: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.infoVisible.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getVisibleOptions(registerId);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.infoVisible.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.infoVisible.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },

  getDiagnose(registerId: number, patientId: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.diagnose.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getDiagnosis(registerId, patientId);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.diagnose.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.diagnose.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },
  getServices(registerId: number, patientId: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.services.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getServices(registerId, patientId);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.services.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.services.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },

  getMedicalCareCase(registerId: number, patientId: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.medicalCareCase.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getMedicalCareCase(registerId, patientId);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.medicalCareCase.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.medicalCareCase.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },
  getCurrentMedicalCareCase(caseBizKey: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.currentMedicalCareCase.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getMedicalCareCaseNew(caseBizKey);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.currentMedicalCareCase.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(
          DiseaseCardEpicrisisAction.currentMedicalCareCase.failed({ params: null, error: castUnknownToError(error) })
        );
      }
    };
  },

  getAnamnesisOfLife(registerId: number, patientId: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.anamnesisOfLife.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getAnamnesOfLive(registerId, patientId);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.anamnesisOfLife.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.anamnesisOfLife.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },

  getAnamnesisOfDisease(registerId: number, patientId: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.anamnesisOfDisease.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getAnamnesisOfDiseases(registerId, patientId);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.anamnesisOfDisease.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(
          DiseaseCardEpicrisisAction.anamnesisOfDisease.failed({ params: null, error: castUnknownToError(error) })
        );
      }
    };
  },

  getObjectiveState(registerId: number, patientId: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.objectiveState.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getObjectiveStates(registerId, patientId);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.objectiveState.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.objectiveState.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },

  getMedicalOrganization(registerId: number, patientId: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.medicalOrganization.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getMedOrganization(registerId, patientId);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.medicalOrganization.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(
          DiseaseCardEpicrisisAction.medicalOrganization.failed({ params: null, error: castUnknownToError(error) })
        );
      }
    };
  },

  getReferencePlan(registerId: number, patientId: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.referencePlan.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getReferencePlan(registerId, patientId);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.referencePlan.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.referencePlan.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },

  getReferrals(registerId: number, patientId: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.referrals.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getReferral(registerId, patientId);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.referrals.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.referrals.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },

  getInstrumentalAnalysis(registerId: number, patientId: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.instrumentalAnalysis.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getInstrumentalAnalysis(registerId, patientId);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.instrumentalAnalysis.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(
          DiseaseCardEpicrisisAction.instrumentalAnalysis.failed({ params: null, error: castUnknownToError(error) })
        );
      }
    };
  },

  getAggregates(registerId: number, patientId: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.aggregates.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getAggregates(registerId, patientId);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.aggregates.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.aggregates.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },

  getPatient(registerId: number, id: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.infoPatient.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getPatient(registerId, id);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.infoPatient.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.infoPatient.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },
  getPatientDoctorCardUrl(registerId: number, id: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.doctorCardUrl.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getPatientDoctorCardUrl(registerId, id);
        if (result.isError) {
          throw result;
        }
        dispatch(
          DiseaseCardEpicrisisAction.doctorCardUrl.done({ params: null, result: result.result.doctorPortalCardUrl })
        );
      } catch (error) {
        errorPopup(error.message);
        dispatch(DiseaseCardEpicrisisAction.doctorCardUrl.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },
  getPreferentialMedicationSupply(registerId: number, id: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.preferentialMedicationSupply.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getPreferentialMedicationSupply(registerId, id);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.preferentialMedicationSupply.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(
          DiseaseCardEpicrisisAction.preferentialMedicationSupply.failed({
            params: null,
            error: castUnknownToError(error),
          })
        );
      }
    };
  },
  getImmunization(registerId: number, patientId: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.immunization.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getImmunization(registerId, patientId);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.immunization.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.immunization.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },

  getDispensary(registerId: number, patientId: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.dispensary.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getDispensary(registerId, patientId);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.dispensary.done({ params: null, result: result.result.dispensaryList }));
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.dispensary.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },
  getDocuments(registerId: number, patientId: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.documents.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getDocuments(registerId, patientId);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.documents.done({ params: null, result: result.result.event }));
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.documents.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },
  getRecipes(registerId: number, patientId: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.recipes.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getRecipes(registerId, patientId);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.recipes.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.recipes.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },

  getVaccinationList(registerId: number, patientId: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.vaccinationList.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getVaccCalendar(registerId, patientId);
        if (result.isError) {
          throw result;
        }
        dispatch(
          DiseaseCardEpicrisisAction.vaccinationList.done({ params: null, result: result.result.vaccinationList })
        );
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.vaccinationList.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },

  getDictVaccCalendar(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.vaccCalendar.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getDictVaccCalendar();
        if (result.isError) {
          throw result;
        }
        dispatch(
          DiseaseCardEpicrisisAction.vaccCalendar.done({ params: null, result: result.result.vaccinationCalendar })
        );
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.vaccCalendar.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },

  getDictVaccType(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.vaccinationType.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getDictVaccType();
        if (result.isError) {
          throw result;
        }
        dispatch(
          DiseaseCardEpicrisisAction.vaccinationType.done({ params: null, result: result.result.vaccinationType })
        );
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.vaccinationType.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },

  getDictVaccCalendarType(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.vaccCalendarType.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getDictVaccCalendarType();
        if (result.isError) {
          throw result;
        }
        dispatch(
          DiseaseCardEpicrisisAction.vaccCalendarType.done({ params: null, result: result.result.vaccCalendarType })
        );
      } catch (error) {
        dispatch(
          DiseaseCardEpicrisisAction.vaccCalendarType.failed({ params: null, error: castUnknownToError(error) })
        );
      }
    };
  },
  getTmReports(registerId: number, patientId: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.reports.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getTmReports(registerId, patientId);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.reports.done({ params: null, result: result.result.reports }));
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.reports.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },
  getPatientRoute(registerId: number, patientId: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.patientRoute.started(null));
      try {
        const result = await new IntegralDiseaseEpicrisisApiRequest().getPatientRoute(registerId, patientId);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.patientRoute.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DiseaseCardEpicrisisAction.patientRoute.failed({ params: null, error: castUnknownToError(error) }));
      }
    };
  },
};

const castUnknownToError = (e: unknown) => (e instanceof Error ? e : new Error(`UnknownErrorType! Error: ${e}`));
