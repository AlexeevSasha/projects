import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

const state = ({ registerCheckList }: IAppState) => registerCheckList;

export const registerCheckListSelector = createSelector(
  state,
  ({ controlList, activeList, loadingControl, loadingPatient }) => ({
    controlList,
    activeList,
    loadingControl,
    loadingPatient,
  })
);
export const selectDefVal = createSelector(state, ({ defVal }) => ({ defVal }));
export const selectControlList = createSelector(state, ({ controlList }) =>
  controlList.map((item) => ({
    ...item,
    itemsCount:
      item.itemsCount < 0 ? "не пересчитан" : new Intl.NumberFormat("ru", { style: "decimal" }).format(item.itemsCount),
  }))
);
export const selectActiveList = createSelector(state, ({ activeList }) => activeList);
export const selectLoadingControl = createSelector(state, ({ loadingControl }) => loadingControl);
export const selectLoadingPatient = createSelector(state, ({ loadingPatient }) => loadingPatient);
export const selectActiveListId = createSelector(state, ({ activeList }) => activeList);
export const selectPatientList = createSelector(state, ({ patientList }) => patientList);
export const selectControlListFields = createSelector(state, ({ controlListFields, loadingControlListFields }) => ({
  controlListFields,
  loadingControlListFields,
}));
export const selectFilterError = createSelector(state, ({ controlListFilterError }) => controlListFilterError);

export const selectControlListFilter = createSelector(state, ({ controlListFilter, loadingControlListFilter }) => ({
  controlListFilter,
  loadingControlListFilter,
}));
export const selectDownloadXls = createSelector(state, ({ queryLoadingXls, isDownloadXls }) => ({
  queryLoadingXls,
  isDownloadXls,
}));

export const selectDownloadCsv = createSelector(state, ({ queryLoadingCsv }) => ({
  queryLoadingCsv,
}));

export const selectXlsPatientCase = createSelector(state, ({ queryLoadingXlsPatientCase }) => ({
  queryLoadingXlsPatientCase,
}));
