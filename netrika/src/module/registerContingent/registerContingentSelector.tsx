import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

export const registerContingentSelector = createSelector(
  (state: IAppState) => state.registerContingent.list,
  (state: IAppState) => state.registerContingent.loading,
  (state: IAppState) => state.registerContingent.newList,
  (list, loading, newList) => ({ list, loading, newList })
);
