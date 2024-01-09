import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

const state = ({ dictionaryNSI }: IAppState) => dictionaryNSI;

export const dictionaryNSISelector = createSelector(state, ({ list, loading, sessionIdList, sessionToken }) => ({
  list,
  loading,
  sessionIdList,
  sessionToken,
}));
