import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

export const dictionaryConfBlockSelector = createSelector(
  (state: IAppState) => state.dictionaryConfBlock.data,
  (state: IAppState) => state.dictionaryConfBlock.loading,
  (data, loading) => ({ data, loading })
);
