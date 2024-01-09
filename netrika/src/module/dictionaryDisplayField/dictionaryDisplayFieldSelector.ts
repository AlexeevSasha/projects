import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

const state = ({ dictionaryDisplayField }: IAppState) => dictionaryDisplayField;

export const dictionaryDisplayFieldSelector = createSelector(
  state,
  ({
    displayFieldList,
    loading,
    bizObjectsList,
    bizObjectsListLoading,
    attributesList,
    attributesListLoading,
    dictionariesList,
    dictionariesLoading,
    tableFieldList,
    tableFieldListLoading,
  }) => ({
    displayFieldList,
    loading,
    bizObjectsList,
    bizObjectsListLoading,
    attributesList,
    attributesListLoading,
    dictionariesList,
    dictionariesLoading,
    tableFieldList,
    tableFieldListLoading,
  })
);
