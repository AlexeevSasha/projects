import moment from "moment";
import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

export const diseaseCardEpicrisisSelector = ({ diseaseCardEpicrisis }: IAppState) => diseaseCardEpicrisis;
export const filterDiseaseCardEpicrisis = ({ filterDiseaseCardEpicrisis }: IAppState) => filterDiseaseCardEpicrisis;

export const selectCurrentMedicalCarCase = createSelector(
  diseaseCardEpicrisisSelector,
  ({ currentMedicalCareCase, loadingCurrentMedicalCareCase }) => ({
    loadingCurrentMedicalCareCase,
    currentMedicalCareCase,
  })
);

export const selectPatient = createSelector(diseaseCardEpicrisisSelector, ({ patient }) => patient);
export const selectPatientError = createSelector(diseaseCardEpicrisisSelector, ({ error }) => error);

export const selectVisible = createSelector(diseaseCardEpicrisisSelector, ({ infoVisible }) => infoVisible);

export const selectDiagnose = createSelector(diseaseCardEpicrisisSelector, ({ diagnose, loadingDiagnose }) => ({
  diagnose,
  loadingDiagnose,
}));

export const selectReports = createSelector(diseaseCardEpicrisisSelector, ({ reports, loadingReports }) => ({
  reports,
  loadingReports,
}));
export const selectAnamnesisOfLife = createSelector(
  diseaseCardEpicrisisSelector,
  ({ anamnesisOfLife, loadingAnamnesisOfLife }) => ({ anamnesisOfLife, loadingAnamnesisOfLife })
);
export const selectAnamnesisOfDisease = createSelector(
  diseaseCardEpicrisisSelector,
  ({ anamnesisOfDisease, loadingAnamnesisOfDisease }) => ({
    anamnesisOfDisease,
    loadingAnamnesisOfDisease,
  })
);
export const selectObjectiveState = createSelector(
  diseaseCardEpicrisisSelector,
  ({ objectiveState, loadingObjectiveState }) => ({ objectiveState, loadingObjectiveState })
);
export const selectReferencePlan = createSelector(
  diseaseCardEpicrisisSelector,
  ({ referencePlan, loadingReferencePlan }) => ({ referencePlan, loadingReferencePlan })
);
export const selectMedOrganisation = createSelector(
  diseaseCardEpicrisisSelector,
  ({ medicalOrganization, loadingMedOrganization }) => ({
    medicalOrganization: (medicalOrganization.medicalOrganization || []).map((item) => ({
      ...item,
      isSelect: false,
    })),
    loadingMedOrganization,
  })
);

export const selectIsLoading = createSelector(diseaseCardEpicrisisSelector, ({ loading }) => loading);

export const selectFilter = createSelector(filterDiseaseCardEpicrisis, ({ filter }) => filter);
export const selectMedicalCareCase = createSelector(
  diseaseCardEpicrisisSelector,
  ({ medicalCareCase }) => medicalCareCase
);

export const selectFilteredMedicalCareCase = createSelector(
  (state: IAppState) => state.filterDiseaseCardEpicrisis.filter,
  (state: IAppState) => state.diseaseCardEpicrisis.medicalCareCase,
  (filter, medicalCareCase) =>
    (medicalCareCase.medicalCareCase || []).filter(
      ({ caseOpenAt, caseLpu }) =>
        (!filter.orgs.length || filter.orgs.some(({ name }) => name === caseLpu)) &&
        (!filter.date || moment(caseOpenAt).format("MM YYYY") === moment(filter.date).format("MM YYYY"))
    )
);

export const selectReferral = createSelector(diseaseCardEpicrisisSelector, ({ referrals, loadingReferral }) => ({
  referrals,
  loadingReferral,
}));

export const selectInstrumentalAnalysis = createSelector(
  diseaseCardEpicrisisSelector,
  ({ instrumentalAnalysis, loadingInstrumentalAnalysis }) => ({
    instrumentalAnalysis,
    loadingInstrumentalAnalysis,
  })
);
export const selectAggregates = createSelector(diseaseCardEpicrisisSelector, ({ aggregates, loadingAggregates }) => ({
  aggregates,
  loadingAggregates,
}));

export const selectCustomBlocks = createSelector(
  diseaseCardEpicrisisSelector,
  ({ customBlocks, loadingCustomBlocks }) => ({
    customBlocks,
    loadingCustomBlocks,
  })
);
export const selectPreferentialMedicationSupply = createSelector(
  diseaseCardEpicrisisSelector,
  ({ preferentialMedicationSupply, loadingPreferentialMedicationSupply }) => ({
    preferentialMedicationSupply,
    loadingPreferentialMedicationSupply,
  })
);

export const selectImmunization = createSelector(
  diseaseCardEpicrisisSelector,
  ({ immunization, loadingImmunization }) => ({
    immunization,
    loadingImmunization,
  })
);

export const selectDispensary = createSelector(diseaseCardEpicrisisSelector, ({ dispensary, loadingDispensary }) => ({
  dispensary,
  loadingDispensary,
}));

export const selectDocuments = createSelector(diseaseCardEpicrisisSelector, ({ documents, loadingDocuments }) => ({
  documents,
  loadingDocuments,
}));
export const selectRecipes = createSelector(diseaseCardEpicrisisSelector, ({ recipes, loadingRecipes }) => ({
  recipes,
  loadingRecipes,
}));

export const selectVaccinationList = createSelector(
  diseaseCardEpicrisisSelector,
  ({ vaccinationList, loadingVaccinationList }) => ({
    vaccinationList,
    loadingVaccinationList,
  })
);

export const selectVaccinationCalendar = createSelector(
  diseaseCardEpicrisisSelector,
  ({ vaccinationCalendar, loadingVaccinationCalendar }) => ({
    vaccinationCalendar,
    loadingVaccinationCalendar,
  })
);

export const selectVaccinationType = createSelector(
  diseaseCardEpicrisisSelector,
  ({ vaccinationType, loadingVaccinationType }) => ({
    vaccinationType,
    loadingVaccinationType,
  })
);

export const selectVaccCalendarType = createSelector(
  diseaseCardEpicrisisSelector,
  ({ vaccCalendarType, loadingVaccCalendarType }) => ({
    vaccCalendarType,
    loadingVaccCalendarType,
  })
);

export const selectDoctorCardUrl = createSelector(
  diseaseCardEpicrisisSelector,
  ({ doctorCardUrl, loadingDoctorCardUrl }) => ({
    doctorCardUrl,
    loadingDoctorCardUrl,
  })
);

export const selectServices = createSelector(diseaseCardEpicrisisSelector, ({ services, loadingServices }) => ({
  services,
  loadingServices,
}));
export const selectPatientRout = createSelector(
  diseaseCardEpicrisisSelector,
  ({ patientRoute, loadingPatientRoute }) => ({
    patientRoute,
    loadingPatientRoute,
  })
);
