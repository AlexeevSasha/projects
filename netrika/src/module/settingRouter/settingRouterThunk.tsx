import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { SettingRouterAction } from "./settingRouterAction";
import { SettingRouterApiRequest } from "../../api/settingRouterApiRequest";
import { successPopup } from "../../common/helpers/toast/success";
import { IRouterDiagnosis } from "../../common/interfaces/router/IRouterDiagnosis";
import { RouterRegistryRequestDto } from "../../common/interfaces/router/RouterRegistryRequest.g";
import { AppSettings } from "../../common/constants/appSettings";

export const SettingRouterThunk = {
  getVersion(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(SettingRouterAction.routerVersion.started());
      try {
        const result = await new SettingRouterApiRequest(
          AppSettings.get("REACT_APP_API_ROUTER_URL")
        ).getRouterVersion();
        dispatch(SettingRouterAction.routerVersion.done({ result }));
      } catch (error) {
        dispatch(SettingRouterAction.routerVersion.failed({ error }));
        errorPopup("Ошибка при загрузке данных.");
      }
    };
  },
  createRegisters(
    value: RouterRegistryRequestDto,
    updateCurrentRegister: (value: RouterRegistryRequestDto) => void,
    callback: () => void
  ): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new SettingRouterApiRequest(AppSettings.get("REACT_APP_API_ROUTER_URL")).createRegister(
          value
        );
        updateCurrentRegister(result);
        callback();

        successPopup("Регистр успешно создан.");
      } catch (error) {
        errorPopup(error);
      }
    };
  },
  updateRegisters(
    value: RouterRegistryRequestDto,
    updateCurrentRegister: (value: RouterRegistryRequestDto) => void,
    callback: () => void
  ): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new SettingRouterApiRequest(AppSettings.get("REACT_APP_API_ROUTER_URL")).updateRegister(
          value
        );
        updateCurrentRegister(result);
        callback();
        successPopup("Регистр успешно обновлен.");
      } catch (error) {
        errorPopup(error);
      }
    };
  },

  getAllRegisters(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(SettingRouterAction.routerRegistryList.started());
      try {
        const result = await new SettingRouterApiRequest(AppSettings.get("REACT_APP_API_ROUTER_URL")).getAllRegisters();
        dispatch(SettingRouterAction.routerRegistryList.done({ result }));
      } catch (error) {
        dispatch(SettingRouterAction.routerRegistryList.failed({ error }));
        errorPopup("Ошибка при загрузке данных.");
      }
    };
  },
  getAllDiagnosis(registryId: any): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(SettingRouterAction.routerDiagnosisList.started());
      try {
        const result = await new SettingRouterApiRequest(AppSettings.get("REACT_APP_API_ROUTER_URL")).getAllDiagnosis(
          registryId
        );
        dispatch(SettingRouterAction.routerDiagnosisList.done({ result }));
      } catch (error) {
        dispatch(SettingRouterAction.routerDiagnosisList.failed({ error }));
        errorPopup("Ошибка при загрузке данных.");
      }
    };
  },
  deleteRegister(idList: number[]): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new SettingRouterApiRequest(AppSettings.get("REACT_APP_API_ROUTER_URL")).deleteRegister(
          idList
        );
        if (result.isError) {
          throw result;
        }
        successPopup("Регистр успешно удалён.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },
  createDiagnose(
    value: IRouterDiagnosis,
    index: number,
    updateDiagnoseList: (index: number, diagnose: IRouterDiagnosis) => void,
    callback: () => void
  ): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new SettingRouterApiRequest(AppSettings.get("REACT_APP_API_ROUTER_URL")).createDiagnosis(
          value
        );
        updateDiagnoseList(index, result);
        callback();
        successPopup("Диагноз успешно создан.");
      } catch (error) {
        errorPopup("Не удалось сохранить изменения.");
      }
    };
  },
  updateDiagnose(
    value: IRouterDiagnosis,
    index: number,
    updateDiagnoseList: (index: number, diagnose: IRouterDiagnosis) => void,
    callback: () => void
  ): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new SettingRouterApiRequest(AppSettings.get("REACT_APP_API_ROUTER_URL")).updateDiagnosis(
          value
        );
        updateDiagnoseList(index, result);
        callback();
        successPopup("Диагноз успешно обновлен.");
      } catch (error) {
        errorPopup("Не удалось сохранить изменения.");
      }
    };
  },
  deleteDiagnose(idList: number[], updateDiagnoseList: () => void): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new SettingRouterApiRequest(AppSettings.get("REACT_APP_API_ROUTER_URL")).deleteDiagnosis(
          idList
        );
        if (result.isError) {
          throw result;
        }
        updateDiagnoseList();
        successPopup("Дигноз успешно удалён.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },
};
