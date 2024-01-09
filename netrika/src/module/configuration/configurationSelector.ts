import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

export const configurationSelector = createSelector(
  (state: IAppState) => state.configuration.checkControlEventsOption,
  (state: IAppState) => state.configuration.loading,
  (state: IAppState) => state.configuration.userPasswordOption,
  (state: IAppState) => state.configuration.userPasswordOptionLoading,
  (state: IAppState) => state.configuration.contingentOption,

  (checkControlEventsOption, loading, userPasswordOption, userPasswordOptionLoading, contingentOption) => ({
    checkControlEventsOption,
    loading,
    userPasswordOption,
    userPasswordOptionLoading,
    contingentOption,
  })
);
