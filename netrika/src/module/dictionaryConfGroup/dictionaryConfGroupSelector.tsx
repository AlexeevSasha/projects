import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

export const dictionaryConfGroupSelector = createSelector(
  (state: IAppState) => state.dictionaryConfGroup.data,
  (state: IAppState) => state.dictionaryConfGroup.loading,
  (data, loading) => ({ data, loading })
);
