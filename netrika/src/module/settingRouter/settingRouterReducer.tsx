import { reducerWithInitialState } from "typescript-fsa-reducers";
import { IRouterVersionRequest } from "../../common/interfaces/router/IRouterVersionRequest";
import { SettingRouterAction } from "./settingRouterAction";
import { RouterRegistryRequestDto } from "../../common/interfaces/router/RouterRegistryRequest.g";
import { IRouterDiagnosis } from "../../common/interfaces/router/IRouterDiagnosis";

interface IState {
  version: IRouterVersionRequest;
  routerRegistryList: RouterRegistryRequestDto[];
  loading: boolean;

  routerDiagnosisList: IRouterDiagnosis[];
  loadingRouterDiagnosisList: boolean;
}

const InitialState: IState = {
  version: {} as IRouterVersionRequest,
  routerRegistryList: [] as RouterRegistryRequestDto[],
  loading: false,
  loadingRouterDiagnosisList: false,
  routerDiagnosisList: [] as IRouterDiagnosis[],
};

export const settingRouterReducer = reducerWithInitialState(InitialState)
  .case(SettingRouterAction.routerVersion.started, (state) => ({
    ...state,
    version: state.version,
    loading: true,
  }))
  .case(SettingRouterAction.routerVersion.done, (state, payload) => ({
    ...state,
    version: payload.result,
    loading: false,
  }))
  .case(SettingRouterAction.routerVersion.failed, (state) => ({
    ...state,
    version: state.version,
    loading: false,
  }))
  .case(SettingRouterAction.routerRegistryList.started, (state) => ({
    ...state,
    routerRegistryList: state.routerRegistryList,
    loading: true,
  }))
  .case(SettingRouterAction.routerRegistryList.done, (state, payload) => ({
    ...state,
    routerRegistryList: payload.result,
    loading: false,
  }))
  .case(SettingRouterAction.routerRegistryList.failed, (state) => ({
    ...state,
    routerRegistryList: state.routerRegistryList,
    loading: false,
  }))
  .case(SettingRouterAction.routerDiagnosisList.started, (state) => ({
    ...state,
    routerDiagnosisList: state.routerDiagnosisList,
    loadingRouterDiagnosisList: true,
  }))
  .case(SettingRouterAction.routerDiagnosisList.done, (state, payload) => ({
    ...state,
    routerDiagnosisList: payload.result,
    loadingRouterDiagnosisList: false,
  }))
  .case(SettingRouterAction.routerDiagnosisList.failed, (state) => ({
    ...state,
    routerDiagnosisList: state.routerDiagnosisList,
    loadingRouterDiagnosisList: false,
  }))
  .build();
