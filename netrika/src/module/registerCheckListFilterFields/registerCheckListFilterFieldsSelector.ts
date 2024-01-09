import { IAppState } from "../../store/mainReducer";
import { createSelector } from "reselect";

const state = ({ registerCheckListFilterFields }: IAppState) => registerCheckListFilterFields;

export const filterFieldsListSelector = createSelector(
  state,
  ({
    filterFields,
    loadingFilterFields,
    defaultFilterFields,
    loadingDefaultFilterFields,
    errorMessage,
    loadingScreen,
  }) => ({
    filterFields,
    loadingFilterFields,
    defaultFilterFields,
    loadingDefaultFilterFields,
    errorMessage,
    loadingScreen,
  })
);
