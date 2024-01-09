import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

export const dictionaryRegisterGroupSelector = createSelector(
  (state: IAppState) => state.dictionaryRegisterGroup.data,
  (state: IAppState) => state.dictionaryRegisterGroup.loading,
  (data, loading) => ({ data, loading })
);
