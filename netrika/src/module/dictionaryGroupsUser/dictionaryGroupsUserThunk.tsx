import { DictionaryUserGroupApiRequest } from "api/dictionaryUserGroupApiRequest";
import { IBaseDictionary } from "common/interfaces/dictionary/IBaseDictionary";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { successPopup } from "../../common/helpers/toast/success";
import { DictionaryGroupsUserAction } from "./dictionaryGroupsUserAction";

export const DictionaryGroupsUserThunk = {
  getDictionarySearch(pageIndex: number, pageSize: number, searchText: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryGroupsUserAction.groupsList.started(null));
      try {
        const result = await new DictionaryUserGroupApiRequest().getUserGroupsWithSearch(
          pageIndex,
          pageSize,
          searchText
        );
        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryGroupsUserAction.groupsList.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DictionaryGroupsUserAction.groupsList.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  createUserGroup(value: IBaseDictionary): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryGroupsUserAction.groupsList.started(null));
      try {
        const result = await new DictionaryUserGroupApiRequest().createUserGroup(value);
        if (result.isError) {
          throw result;
        }
        successPopup("Элемент справочника успешно добавлен.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  updateUserGroup(value: IBaseDictionary): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryGroupsUserAction.groupsList.started(null));
      try {
        const result = await new DictionaryUserGroupApiRequest().updateUserGroup(value, value.id);
        if (result.isError) {
          throw result;
        }
        successPopup("Элемент справочника успешно изменён.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  deleteUserGroup(registerGroupId: number[]): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryGroupsUserAction.groupsList.started(null));
      try {
        const result = await new DictionaryUserGroupApiRequest().deleteUserGroup(registerGroupId);
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
