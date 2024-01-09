import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

const state = ({ dictionaryLog }: IAppState) => dictionaryLog;

export const dictionaryLogSelector = createSelector( state, ({ dictionaryLogList, loading }) => ({
  dictionaryLogList,
  loading,
}));
