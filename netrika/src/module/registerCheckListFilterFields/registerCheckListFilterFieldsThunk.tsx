import { RegisterControlListApiRequest } from "api/registerControlListApiRequest";
import { ru } from "common/lang/ru";
import { IAppDispatch, IAppState, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { RegisterCheckListFilterFieldsAction } from "./registerCheckListFilterFieldsAction";
import { IRegisterFilterFields } from "../../common/interfaces/register/IRegisterFilterFields";
import { RegisterCheckListThunk } from "../registerCheckList/registerCheckListThunk";

export const RegisterCheckListFilterFieldsThunk = {
  getRegisterFilterFields(registerId: string, controlListId: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterCheckListFilterFieldsAction.filterInfo.started(undefined));
      try {
        const result = await new RegisterControlListApiRequest().getRegisterFilterFields(registerId, controlListId);
        if (result.isError) {
          throw result;
        }
        dispatch(RegisterCheckListFilterFieldsAction.filterInfo.done({ result: result.result }));
      } catch (error) {
        errorPopup(error.message || ru.error.unknown);
        dispatch(RegisterCheckListFilterFieldsAction.filterInfo.failed(error));
      }
    };
  },
  getRegisterDefaultFilterFields(registerId: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterCheckListFilterFieldsAction.defaultFilterInfo.started(undefined));
      try {
        const result = await new RegisterControlListApiRequest().getRegisterDefaultFilterFields(registerId);

        if (result.isError) {
          throw result;
        }
        dispatch(
          RegisterCheckListFilterFieldsAction.defaultFilterInfo.done({
            result: { filterGroup: result.result, message: result.message },
          })
        );
      } catch (error) {
        errorPopup(error.message || ru.error.unknown);
        dispatch(RegisterCheckListFilterFieldsAction.defaultFilterInfo.failed(error));
      }
    };
  },
  createRegisterDefaultFilterFields(
    registerId: number,
    data: IRegisterFilterFields,
    onClose: () => void
  ): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      const state = getState().registerSettingsCheckList.setting.registerId;

      dispatch(RegisterCheckListFilterFieldsAction.updateFilterInfo.started(undefined));
      try {
        const result = await new RegisterControlListApiRequest().createRegisterFilterFields(String(registerId), data);

        if (result.isError) {
          throw result;
        }
        dispatch(RegisterCheckListThunk.getControlList(state, result.result));
        dispatch(RegisterCheckListFilterFieldsAction.updateFilterInfo.done({}));
        onClose();
      } catch (error) {
        errorPopup(error.message || ru.error.unknown);
        dispatch(RegisterCheckListFilterFieldsAction.updateFilterInfo.failed({ error: error.message }));
      }
    };
  },
  updateRegisterDefaultFilterFields(
    registerId: number,
    controlListId: number,
    data: IRegisterFilterFields,
    onClose: () => void
  ): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      const state = getState().registerSettingsCheckList.setting.registerId;

      dispatch(RegisterCheckListFilterFieldsAction.updateFilterInfo.started(undefined));
      try {
        const result = await new RegisterControlListApiRequest().updateRegisterFilterFields(
          String(registerId),
          controlListId,
          data
        );

        if (result.isError) {
          throw result;
        }
        dispatch(RegisterCheckListThunk.getControlList(state, result.result));
        dispatch(RegisterCheckListFilterFieldsAction.updateFilterInfo.done({}));
        onClose();
      } catch (error) {
        errorPopup(error.message || ru.error.unknown);
        dispatch(RegisterCheckListFilterFieldsAction.updateFilterInfo.failed({ error: error.message }));
      }
    };
  },
};
