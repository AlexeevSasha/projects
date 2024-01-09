import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

const state = ({ dictionaryRolesUser }: IAppState) => dictionaryRolesUser;

export const dictionaryRolesUserSelector = createSelector(state, ({ data, loading }) => ({
  data,
  loading,
}));
