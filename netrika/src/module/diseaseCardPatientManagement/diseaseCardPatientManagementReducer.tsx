import { CriterionExecuteResultEnum } from "common/interfaces/CriterionExecuteResultEnum";
import { IMedicalViolation } from "common/interfaces/medical/IMedicalViolation";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { IMedicalCareCase } from "../../common/interfaces/medical/IMedicalCareCase";
import { IMedicalViolations } from "../../common/interfaces/medical/IMedicalViolations";
import { DiseaseCardPatientManagementAction } from "./diseaseCardPatientManagementAction";
import { IClinrec } from "../../common/interfaces/clinrec/IClinrec";
import { IPompResponse } from "../../common/interfaces/IPompResponse";
import { IMedicalViolationsMonthInfo } from "../../common/interfaces/medical/IMedicalViolationsMonthInfo";
import { IMedicalViolationsDayInfo } from "../../common/interfaces/medical/IMedicalViolationsDayInfo";
import { IMedicalViolationsCaseDetails } from "../../common/interfaces/medical/IMedicalViolationsCaseDetails";

export interface IState {
  data: IMedicalViolations;
  loading: boolean;
  error: boolean;

  errorCalendar: boolean;
  calendar: IMedicalCareCase[];
  newCalendar: IMedicalViolationsMonthInfo[];
  loadingNewCalendar: boolean;
  loadingCalendar: boolean;

  calendarMonth: IMedicalViolationsDayInfo[];
  loadingCalendarMonth: boolean;

  calendarDay: IMedicalViolationsCaseDetails[];
  loadingCalendarDay: boolean;
  cards: {
    met: IMedicalViolation[];
    notMet: IMedicalViolation[];
    noData: IMedicalViolation[];
  };
  violatDate: (Date | string)[];
  dateMetRequirement: (Date | string)[];
  caseById: Record<string, CriterionExecuteResultEnum[]>;

  clinrec: IClinrec[];
  loadingClinrec: boolean;

  pomp: IPompResponse[];
  loadingPomp: boolean;
}

export const InitialState: IState = {
  data: {} as IMedicalViolations,
  loading: true,
  error: false,
  errorCalendar: false,
  calendar: [],
  loadingCalendar: true,
  cards: {
    met: [],
    notMet: [],
    noData: [],
  },
  violatDate: [],
  dateMetRequirement: [],
  caseById: {},
  clinrec: [] as IClinrec[],
  loadingClinrec: false,
  pomp: [] as IPompResponse[],
  loadingPomp: false,

  newCalendar: [],
  loadingNewCalendar: false,

  calendarMonth: [],
  loadingCalendarMonth: false,

  calendarDay: [],
  loadingCalendarDay: false,
};

export const diseaseCardPatientManagementReducer = reducerWithInitialState(InitialState)
  .case(DiseaseCardPatientManagementAction.infoViolation.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(DiseaseCardPatientManagementAction.infoViolation.failed, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))
  .case(DiseaseCardPatientManagementAction.infoViolation.done, (state, { result }) => ({
    ...state,
    data: result,
    loading: false,
    error: false,
    ...result.qualityCriterion?.reduce(
      ({ cards, violatDate, dateMetRequirement, caseById: prevCaseById }, criterion) => {
        const caseById = { ...prevCaseById };
        criterion.medicalViolationResult.forEach(
          (item) => (caseById[item.caseId] = [...(caseById[item.caseId] || []), item.status])
        );
        if (
          criterion.medicalViolationResult.some(
            (item) => item.status === CriterionExecuteResultEnum.NotMetRequirement
          ) &&
          criterion.medicalViolationResult.some((item) => item.status === CriterionExecuteResultEnum.MetRequirement)
        ) {
          const nextViolatDate = [
            ...violatDate,
            ...criterion.medicalViolationResult
              .filter(({ status }) => status === CriterionExecuteResultEnum.NotMetRequirement)
              .map(({ caseData }) => caseData),
          ];

          const nextDateMetRequirement = [
            ...dateMetRequirement,
            ...criterion.medicalViolationResult
              .filter(({ status }) => status === CriterionExecuteResultEnum.MetRequirement)
              .map(({ caseData }) => caseData),
          ];
          return {
            cards: { ...cards, notMet: [...cards.notMet, criterion], met: [...cards.met, criterion] },
            violatDate: nextViolatDate,
            dateMetRequirement: nextDateMetRequirement,
            caseById,
          };
        } else if (
          criterion.medicalViolationResult.some((item) => item.status === CriterionExecuteResultEnum.NotMetRequirement)
        ) {
          const nextViolatDate = [
            ...violatDate,
            ...criterion.medicalViolationResult
              .filter(({ status }) => status === CriterionExecuteResultEnum.NotMetRequirement)
              .map(({ caseData }) => caseData),
          ];
          return {
            cards: { ...cards, notMet: [...cards.notMet, criterion] },
            violatDate: nextViolatDate,
            dateMetRequirement,
            caseById,
          };
        } else if (
          criterion.medicalViolationResult.some((item) => item.status === CriterionExecuteResultEnum.MetRequirement)
        ) {
          const nextDateMetRequirement = [
            ...dateMetRequirement,
            ...criterion.medicalViolationResult
              .filter(({ status }) => status === CriterionExecuteResultEnum.MetRequirement)
              .map(({ caseData }) => caseData),
          ];
          return {
            cards: { ...cards, met: [...cards.met, criterion] },
            violatDate,
            dateMetRequirement: nextDateMetRequirement,
            caseById,
          };
        } else
          return {
            cards: { ...cards, noData: [...cards.noData, criterion] },
            violatDate,
            dateMetRequirement,
            caseById,
          };
      },
      {
        cards: { ...InitialState.cards },
        violatDate: [...InitialState.violatDate],
        caseById: { ...InitialState.caseById },
        dateMetRequirement: [...InitialState.dateMetRequirement],
      }
    ),
  }))

  .case(DiseaseCardPatientManagementAction.calendar.started, (state) => ({
    ...state,
    newCalendar: [],
    loadingNewCalendar: true,
    errorCalendar: false,
  }))
  .case(DiseaseCardPatientManagementAction.calendar.done, (state, { result }) => ({
    ...state,
    newCalendar: result,
    loadingNewCalendar: false,
  }))
  .case(DiseaseCardPatientManagementAction.calendar.failed, (state) => ({
    ...state,
    errorCalendar: true,
    loadingNewCalendar: false,
  }))
  .case(DiseaseCardPatientManagementAction.calendarMonth.started, (state) => ({
    ...state,
    calendarMonth: [],
    loadingCalendarMonth: true,
  }))
  .case(DiseaseCardPatientManagementAction.calendarMonth.done, (state, { result }) => ({
    ...state,
    calendarMonth: result,
    loadingCalendarMonth: false,
  }))
  .case(DiseaseCardPatientManagementAction.calendarMonth.failed, (state) => ({
    ...state,
    error: true,
    loadingCalendarMonth: false,
  }))
  .case(DiseaseCardPatientManagementAction.calendarDay.started, (state) => ({
    ...state,
    calendarDay: [],
    loadingCalendarDay: true,
  }))
  .case(DiseaseCardPatientManagementAction.calendarDay.done, (state, { result }) => ({
    ...state,
    calendarDay: result,
    loadingCalendarDay: false,
  }))
  .case(DiseaseCardPatientManagementAction.calendarDay.failed, (state) => ({
    ...state,
    error: true,
    loadingCalendarDay: false,
  }))
  .case(DiseaseCardPatientManagementAction.infoClinrec.started, (state) => ({
    ...state,
    clinrec: [],
    loadingClinrec: true,
  }))
  .case(DiseaseCardPatientManagementAction.infoClinrec.done, (state, { result }) => ({
    ...state,
    clinrec: result,
    loadingClinrec: false,
  }))
  .case(DiseaseCardPatientManagementAction.infoClinrec.failed, (state) => ({
    ...state,
    error: true,
    clinrec: [],
    loadingClinrec: false,
  }))
  .case(DiseaseCardPatientManagementAction.infoPomp.started, (state) => ({
    ...state,
    pomp: [],
    loadingPomp: true,
  }))
  .case(DiseaseCardPatientManagementAction.infoPomp.done, (state, { result }) => ({
    ...state,
    pomp: result,
    loadingPomp: false,
  }))
  .case(DiseaseCardPatientManagementAction.infoPomp.failed, (state) => ({
    ...state,
    error: true,
    pomp: [],
    loadingPomp: false,
  }))
  .build();
