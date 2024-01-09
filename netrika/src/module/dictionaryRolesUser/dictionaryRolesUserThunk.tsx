import { DictionaryUserRoleApiRequest } from "api/dictionaryUserRoleApiRequest";
import { IDictionaryUserRole } from "common/interfaces/dictionary/IDictionaryUserRole";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { successPopup } from "../../common/helpers/toast/success";
import { DictionaryRolesUserAction } from "./dictionaryRolesUserAction";

export const DictionaryRolesUserThunk = {
  getDictionarySearch(pageIndex: number, pageSize: number, searchText: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryRolesUserAction.rolesList.started(null));
      try {
        const result = await new DictionaryUserRoleApiRequest().getUserRoleyWithSearch(pageIndex, pageSize, searchText);
        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryRolesUserAction.rolesList.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DictionaryRolesUserAction.rolesList.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  createRoleUser(value: IDictionaryUserRole): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryRolesUserAction.rolesList.started(null));
      try {
        const result = await new DictionaryUserRoleApiRequest().createUserRole(value);
        if (result.isError) {
          throw result;
        }
        successPopup("Элемент справочника успешно добавлен.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  updateRoleUser(value: IDictionaryUserRole): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryRolesUserAction.rolesList.started(null));
      try {
        const result = await new DictionaryUserRoleApiRequest().updateUserRole(value, value.id);
        if (result.isError) {
          throw result;
        }
        successPopup("Элемент справочника успешно изменён.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  deleteRoleUser(registerGroupId: number[]): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryRolesUserAction.rolesList.started(null));
      try {
        const result = await new DictionaryUserRoleApiRequest().deleteUserRole(registerGroupId);
        if (result.isError) {
          throw result;
        }
        successPopup("Элемент справочника успешно удалён.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },
};
