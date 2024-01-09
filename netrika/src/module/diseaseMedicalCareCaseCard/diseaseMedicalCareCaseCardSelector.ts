import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

const state = ({ diseaseMedicalCareCaseCard }: IAppState) => diseaseMedicalCareCaseCard;

export const diseaseMedicalCareCaseCardSelector = createSelector(state, ({ steps, loadingSteps }) => ({
  steps,
  loadingSteps,
}));
