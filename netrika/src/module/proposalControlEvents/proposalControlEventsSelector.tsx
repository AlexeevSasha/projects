import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

export const proposalControlEventsSelector = createSelector(
  (state: IAppState) => state.proposalControlEvents.controlEventsList,
  (state: IAppState) => state.proposalControlEvents.loading,
  (controlEventsList, loading) => ({ controlEventsList, loading })
);
