import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

const state = ({ diseaseCardPatientManagement }: IAppState) => diseaseCardPatientManagement;

export const diseaseCardPatientManagementSelector = createSelector(
  state,
  (state: IAppState) => state.diseaseCardEpicrisis.patient,
  (state, patient) => ({ ...state, patient })
);

export const selectCards = createSelector(state, ({ cards }) => cards);
