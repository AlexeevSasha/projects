import { DictionaryRegisterGroupApiRequest } from "api/dictionaryRegisterGroupApiRequest";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { successPopup } from "../../common/helpers/toast/success";
import { DictionaryRegisterGroupAction } from "./dictionaryRegisterGroupAction";
import { IBaseDictionary } from "../../common/interfaces/dictionary/IBaseDictionary";

export const DictionaryRegisterGroupThunk = {
  getDictionarySearch(pageIndex: number, pageSize: number, searchText: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryRegisterGroupAction.dictionaryRegisterGroup.started(null));
      try {
        const result = await new DictionaryRegisterGroupApiRequest().getDictionaryWithSearch(
          pageIndex,
          pageSize,
          searchText
        );
        if (result.isError) {
          throw result;
        }
        dispatch(
          DictionaryRegisterGroupAction.dictionaryRegisterGroup.done({
            params: null,
            result: result.result,
          })
        );
      } catch (error) {
        dispatch(DictionaryRegisterGroupAction.dictionaryRegisterGroup.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  deleteRegisterGroup(registerGroupId: number[]): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryRegisterGroupAction.dictionaryRegisterGroup.started(null));
      try {
        const result = await new DictionaryRegisterGroupApiRequest().deleteRegisterGroup(registerGroupId);
        if (result.isError) {
          throw result;
        }
        successPopup("Элемент справочника успешно удалён.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  createRegisterGroup(value: IBaseDictionary): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryRegisterGroupAction.dictionaryRegisterGroup.started(null));
      try {
        const result = await new DictionaryRegisterGroupApiRequest().createRegisterGroup(value);
        if (result.isError) {
          throw result;
        }
        successPopup("Элемент справочника успешно добавлен.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  updateRegisterGroup(value: IBaseDictionary): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryRegisterGroupAction.dictionaryRegisterGroup.started(null));
      try {
        const result = await new DictionaryRegisterGroupApiRequest().updateRegisterGroup(value.id, value);
        if (result.isError) {
          throw result;
        }
        successPopup("Элемент справочника успешно изменён.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },
};
