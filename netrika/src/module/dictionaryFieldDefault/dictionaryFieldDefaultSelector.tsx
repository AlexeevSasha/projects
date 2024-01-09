import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

const state = ({ dictionaryFieldDefault }: IAppState) => dictionaryFieldDefault;

export const dictionaryFieldDefaultSelector = createSelector(
  state,
  ({ data, loading, listName, listBizObj }) => ({ data, loading, listName, listBizObj })
);
