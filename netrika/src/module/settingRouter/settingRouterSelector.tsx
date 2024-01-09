import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

const state = ({ settingRouter }: IAppState) => settingRouter;

export const selectRouterRegistry = createSelector(
  state,
  ({ version, routerRegistryList, loading, routerDiagnosisList, loadingRouterDiagnosisList }) => ({
    version,
    routerRegistryList,
    loading,
    routerDiagnosisList,
    loadingRouterDiagnosisList,
  })
);
