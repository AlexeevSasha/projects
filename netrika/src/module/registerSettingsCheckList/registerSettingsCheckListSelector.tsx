import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

const state = ({ registerSettingsCheckList }: IAppState) => registerSettingsCheckList;
export const selectIsLoading = createSelector(state, ({ loading }) => loading);
export const selectDisabledSave = createSelector(state, ({ disabledSave }) => disabledSave);
export const selectTestResult = createSelector(state, ({ testCheckList }) => testCheckList);
export const selectErrors = createSelector(state, ({ errors }) => errors);
export const selectSettings = createSelector(state, ({ setting }) => setting);
export const qualitySelector = createSelector(selectSettings, ({ qualityCriterion }) => qualityCriterion);
export const selectSearchType = createSelector(selectSettings, ({ searchType }) => searchType);
export const selectSearchSQL = createSelector(selectSettings, ({ searchSql }) => searchSql);
export const selectCommonSettings = createSelector(selectSettings, ({ name, description, searchFields }) => ({
  name,
  description,
  searchFields,
}));
