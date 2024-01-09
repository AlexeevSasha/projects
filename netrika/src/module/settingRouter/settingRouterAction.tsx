import { actionCreator } from "../../store/action/actionCreator";
import { IRouterVersionRequest } from "../../common/interfaces/router/IRouterVersionRequest";
import { RouterRegistryRequestDto } from "../../common/interfaces/router/RouterRegistryRequest.g";
import { IRouterDiagnosis } from "../../common/interfaces/router/IRouterDiagnosis";

export class SettingRouterAction {
  static routerVersion = actionCreator.async<void, IRouterVersionRequest, Error>("Router/routerVersion");
  static routerRegistryList = actionCreator.async<void, RouterRegistryRequestDto[], Error>("Router/RouterRegistryList");
  static routerDiagnosisList = actionCreator.async<void, IRouterDiagnosis[], Error>("Router/RouterDiagnosisList");
  static createRouterDiagnose = actionCreator.async<null, any, Error>("Router/createDiagnose");
}
