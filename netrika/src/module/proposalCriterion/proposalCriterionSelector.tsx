import { IAppState } from "../../store/mainReducer";
import { createSelector } from "reselect";

export const proposalCriterionSelector = ({ proposalCriterion }: IAppState) => proposalCriterion;

export const selectDescription = createSelector(
  proposalCriterionSelector,
  ({ criterionText }) => criterionText.criteriaDescription
);

export const selectIsLoading = createSelector(proposalCriterionSelector, ({ loading }) => loading);
