import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

export const dictionaryBizObjectSelector = createSelector(
  (state: IAppState) => state.dictionaryBizObject.data,
  (state: IAppState) => state.dictionaryBizObject.loading,
  (data, loading) => ({ data, loading })
);
