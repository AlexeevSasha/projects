import { CommonToolsApiRequest } from "api/сommonToolsApiRequest";
import { RegisterApiRequest } from "api/registerApiRequest";
import { RegisterControlListApiRequest } from "api/registerControlListApiRequest";
import { errorPopup } from "common/helpers/toast/error";
import { successPopup } from "common/helpers/toast/success";
import { IControlListWithFilter } from "../../common/interfaces/control/IControlListWithFilter";
import { IFilter } from "../../common/interfaces/IFilter";
import { IAppDispatch, IAppState, IThunkAction } from "../../store/mainReducer";
import { FilterConstructorAction } from "../filter/filterConstructorAction";
import { RegisterCheckListAction } from "../registerCheckList/registerCheckListAction";
import { RegisterCheckListThunk } from "../registerCheckList/registerCheckListThunk";
import { RegisterSettingsCheckListAction } from "./registerSettingsCheckListAction";

export const RegisterSettingsCheckListThunk = {
  getSettings(params: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterSettingsCheckListAction.infoSettings.started());
      try {
        const result = await new RegisterControlListApiRequest().getControlList(params);
        if (result.isError) {
          throw result;
        }
        dispatch(FilterConstructorAction.infoSettings(result.result.filters));
        dispatch(RegisterSettingsCheckListAction.infoSettings.done({ result: result.result }));
        dispatch(RegisterSettingsCheckListAction.updateFieldsValues(result.result.searchFields || []));
      } catch (error) {
        errorPopup(error.message);
        dispatch(RegisterSettingsCheckListAction.infoSettings.failed({ error }));
      }
    };
  },

  addNewCheckList(params: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterSettingsCheckListAction.infoSettings.started());
      try {
        const result = {
          id: 0,
          registerId: params,
          name: "",
          isDefault: false,
          itemsCount: 0,
          searchType: true,
          filters: [] as IFilter[],
        } as IControlListWithFilter;

        dispatch(FilterConstructorAction.infoSettings(result.filters));
        dispatch(RegisterSettingsCheckListAction.infoSettings.done({ result }));
      } catch (error) {
        dispatch(RegisterSettingsCheckListAction.infoSettings.failed({ error }));
      }
    };
  },

  getFilters(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(FilterConstructorAction.infoFilters.started());
      try {
        const result = await Promise.all([
          new CommonToolsApiRequest().getComparisonOperators(),
          new RegisterApiRequest().getRegisterBizObjWithFields(),
          new RegisterApiRequest().getRegisterFields(),
        ]);
        if (result[0].isError) {
          throw result[0];
        }
        if (result[1].isError) {
          throw result[1];
        }
        if (result[2].isError) {
          throw result[2];
        }

        dispatch(
          FilterConstructorAction.infoFilters.done({
            result: {
              comparison: result[0].result,
              bizObjWithFields: result[1].result,
              field: result[2].result,
            },
          })
        );
      } catch (error) {
        dispatch(FilterConstructorAction.infoFilters.failed({ error }));
        errorPopup(error.message);
      }
    };
  },

  testCheckList(): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        dispatch(RegisterSettingsCheckListAction.testCheckList.started());
        const result = await new RegisterControlListApiRequest().testControlList({
          ...getState().registerSettingsCheckList.setting,
          filters: getState().filterReducer.conditions,
        });

        dispatch(RegisterSettingsCheckListAction.testCheckList.done({ result }));
      } catch (error) {
        dispatch(RegisterSettingsCheckListAction.testCheckList.failed(error));
      }
    };
  },

  createCheckList(): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        dispatch(RegisterCheckListAction.infoControlList.started(null));
        const state = getState();
        const result = await new RegisterControlListApiRequest().createControlList({
          ...state.registerSettingsCheckList.setting,
          sort: getState().registerCheckList.controlList.length,
          filters: getState().filterReducer.conditions,
        });

        if (result.isError) {
          throw result;
        }

        dispatch(
          RegisterCheckListThunk.getControlList(state.registerSettingsCheckList.setting.registerId, result.result)
        );
        successPopup("Контрольный список успешно добавлен.");
      } catch (error) {
        dispatch(RegisterCheckListAction.infoControlList.failed(error));
        errorPopup(error.message);
      }
    };
  },

  updateCheckList(): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        dispatch(RegisterCheckListAction.infoControlList.started(null));
        const state = getState();
        const result = await new RegisterControlListApiRequest().updateControlList(
          state.registerSettingsCheckList.setting.id,
          {
            ...state.registerSettingsCheckList.setting,
            filters: getState().filterReducer.conditions,
          }
        );

        if (result.isError) {
          throw result;
        }

        dispatch(
          RegisterCheckListThunk.getControlList(state.registerSettingsCheckList.setting.registerId, result.result)
        );
        successPopup("Контрольный список успешно обновлён.");
      } catch (e) {
        errorPopup(e.message);
      }
    };
  },

  deleteCheckList(registerId: number, id: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        const result = await new RegisterControlListApiRequest().deleteControlList(id);
        if (result.isError) {
          throw result;
        }
        dispatch(RegisterCheckListAction.updateActiveList(getState().registerCheckList.controlList[0]?.id));
        dispatch(RegisterCheckListThunk.getControlList(registerId));
        successPopup("Контрольный список успешно удалён.");
      } catch (e) {
        errorPopup(e.message);
      }
    };
  },

  getQualityCriterionList(params: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        dispatch(RegisterSettingsCheckListAction.getQualityCriterion.started(params));
        const result = await new RegisterControlListApiRequest().getOrderQuality(String(params), 1, 10, "");

        if (result.isError) {
          throw result;
        }
        dispatch(
          RegisterSettingsCheckListAction.getQualityCriterion.done({
            params,
            result: result.result.items,
          })
        );
      } catch (error) {
        errorPopup(error.message);
        dispatch(RegisterSettingsCheckListAction.getQualityCriterion.failed({ params, error }));
      }
    };
  },

  setIsDone(registerId: number, controlListId: number, isDone: boolean): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      const result = await new RegisterControlListApiRequest().setIsDone(controlListId, isDone);
      dispatch(RegisterCheckListThunk.getControlList(registerId));
      if (result.isError) {
        errorPopup(result.message);
      } else {
        successPopup(`Контрольный список ${isDone ? "подтверждён." : "убран из подтверждённых."}`);
      }
    };
  },
};
