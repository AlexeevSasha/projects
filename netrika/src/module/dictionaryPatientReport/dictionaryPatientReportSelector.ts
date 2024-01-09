import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

const state = ({ dictionaryPatientReport }: IAppState) => dictionaryPatientReport;

export const dictionaryPatientReportSelector = createSelector( state, ({ dictionaryPatientReportList, loading }) => ({
  dictionaryPatientReportList,
  loading,
}));
export const dictionaryPatientReportFunctionSelector = createSelector( state, ({ functionLoading, reportFunction }) => ({
  reportFunction,
  functionLoading,
}));
