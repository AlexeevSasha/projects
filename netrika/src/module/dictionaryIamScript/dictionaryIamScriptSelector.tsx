import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

const state = ({ dictionaryIamScript }: IAppState) => dictionaryIamScript;

export const dictionaryIamScriptSelector = createSelector(
  state,
  ({ iamScriptList, loading, updatingLoading, paramTypes, loadingParamTypes, loadingCountParams }) => ({
    iamScriptList,
    loading,
    updatingLoading,
    paramTypes,
    loadingParamTypes,
    loadingCountParams,
  })
);
