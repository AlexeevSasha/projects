import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

const state = ({ proposalContingent }: IAppState) => proposalContingent;

export const proposalContingentSelector = createSelector(
  state,
  ({ contingentList, loading, type, iamScriptsParams, loadingIamScriptsParams }) => ({
    contingentList,
    loading,
    type,
    iamScriptsParams,
    loadingIamScriptsParams,
  })
);
