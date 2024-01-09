import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

export const proposalListSelector = createSelector(
  (state: IAppState) => state.proposalList.list,
  (state: IAppState) => state.proposalList.loading,
  (state: IAppState) => state.proposalList.registerGroup,
  (list, loading, registerGroup) => ({ list, loading, registerGroup })
);
