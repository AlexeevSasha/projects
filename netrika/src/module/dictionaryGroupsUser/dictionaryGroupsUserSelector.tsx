import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

const state = ({ dictionaryGroupsUser }: IAppState) => dictionaryGroupsUser;

export const dictionaryGroupsUserSelector = createSelector(state, ({ data, loading }) => ({
  data,
  loading,
}));
