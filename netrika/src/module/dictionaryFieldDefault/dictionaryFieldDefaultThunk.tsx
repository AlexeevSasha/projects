import { DictionaryDefaultRegisterFieldsApiRequest } from "api/dictionaryDefaultRegisterFieldsApiRequest";
import { IDefaultRegisterFieldDictionary } from "../../common/interfaces/IDefaultRegisterFieldDictionary";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { ICustomSelect } from "../../common/interfaces/ISelect";
import { successPopup } from "../../common/helpers/toast/success";
import { DictionaryFieldDefaultAction } from "./dictionaryFieldDefaultAction";

export const DictionaryFieldDefaultThunk = {
  getDictionarySearch(pageIndex: number, pageSize: number, searchText: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryFieldDefaultAction.dictionaryFieldDefault.started(null));
      try {
        const result = await new DictionaryDefaultRegisterFieldsApiRequest().getDictionaryWithSearch(
          pageIndex,
          pageSize,
          searchText
        );
        if (result.isError) {
          throw result;
        }
        dispatch(
          DictionaryFieldDefaultAction.dictionaryFieldDefault.done({
            params: null,
            result: result.result,
          })
        );
      } catch (error) {
        dispatch(DictionaryFieldDefaultAction.dictionaryFieldDefault.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  getRegistersFieldsName(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryFieldDefaultAction.listFields.started(null));
      try {
        const result = await new DictionaryDefaultRegisterFieldsApiRequest().getRegistersFields();
        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryFieldDefaultAction.listFields.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DictionaryFieldDefaultAction.listFields.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  getBizObj(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryFieldDefaultAction.listBizObj.started(null));
      try {
        const result = await new DictionaryDefaultRegisterFieldsApiRequest().getRegistersFieldsBizObj();
        if (result.isError) {
          throw result;
        }
        dispatch(
          DictionaryFieldDefaultAction.listBizObj.done({
            params: null,
            result: result.result.map((item) => {
              return { value: item.id, label: item.name } as ICustomSelect;
            }),
          })
        );
      } catch (error) {
        dispatch(DictionaryFieldDefaultAction.listBizObj.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  createDefaultRegisterField(value: IDefaultRegisterFieldDictionary): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryFieldDefaultAction.dictionaryFieldDefault.started(null));
      try {
        const result = await new DictionaryDefaultRegisterFieldsApiRequest().createDefaultRegisterField(value);
        if (result.isError) {
          throw result;
        }
        successPopup("Элемент справочника успешно добавлен.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  updateDefaultRegisterField(value: IDefaultRegisterFieldDictionary): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryFieldDefaultAction.dictionaryFieldDefault.started(null));
      try {
        const result = await new DictionaryDefaultRegisterFieldsApiRequest().updateDictionary(value.id, value);
        if (result.isError) {
          throw result;
        }
        successPopup("Элемент справочника успешно изменён.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  deleteDefaultRegisterField(id: number[]): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryFieldDefaultAction.dictionaryFieldDefault.started(null));
      try {
        const result = await new DictionaryDefaultRegisterFieldsApiRequest().deleteDefaultRegisterField(id);
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
