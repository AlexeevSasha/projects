import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

export const registerListSelector = createSelector(
  (state: IAppState) => state.registerList.list,
  (state: IAppState) => state.registerList.loading,
  (list, loading) => ({ list, loading })
);
