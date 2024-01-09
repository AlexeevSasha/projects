import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

export const proposalQualityRequirementsSelector = createSelector(
  (state: IAppState) => state.proposalQualityRequirements.qualityRequirementsList,
  (state: IAppState) => state.proposalQualityRequirements.loading,
  (state: IAppState) => state.proposalQualityRequirements.parentCriterion,
  (state: IAppState) => state.proposalQualityRequirements.fullItem,
  (state: IAppState) => state.proposalQualityRequirements.loadingFullItem,
  (state: IAppState) => state.proposalQualityRequirements.queryList,
  (state: IAppState) => state.proposalQualityRequirements.loadingOrderClinrec,
  (state: IAppState) => state.proposalQualityRequirements.orderClinrec,
  (state: IAppState) => state.proposalQualityRequirements.orderPomp,
  (state: IAppState) => state.proposalQualityRequirements.loadingOrderPomp,

  (
    qualityRequirementsList,
    loading,
    parentCriterion,
    fullItem,
    loadingFullItem,
    queryList,
    loadingOrderClinrec,
    orderClinrec,
    orderPomp,
    loadingOrderPomp
  ) => ({
    qualityRequirementsList,
    loading,
    parentCriterion,
    fullItem,
    loadingFullItem,
    queryList,
    loadingOrderClinrec,
    orderClinrec,
    orderPomp,
    loadingOrderPomp,
  })
);
