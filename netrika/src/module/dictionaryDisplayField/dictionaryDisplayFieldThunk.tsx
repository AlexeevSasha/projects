import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { DictionaryDisplayFieldAction } from "./dictionaryDisplayFieldAction";
import { IDictionaryDisplayFieldRequest } from "../../common/interfaces/dictionary/IDictionaryDisplayFieldRequest";
import { DictionaryDisplayFieldApiRequest } from "../../api/dictionaryDisplayFieldApiRequest";
import { successPopup } from "../../common/helpers/toast/success";
import { ICreateDisplayField } from "../../common/interfaces/dictionary/IDictionaryDisplayField";

export const dictionaryDisplayFieldThunk = {
  getDictionarySearch(data: IDictionaryDisplayFieldRequest): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryDisplayFieldAction.displayFieldList.started(null));
      try {
        const result = await new DictionaryDisplayFieldApiRequest().getDictionaryDisplayFieldList(data);
        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryDisplayFieldAction.displayFieldList.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DictionaryDisplayFieldAction.displayFieldList.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  deleteDictionaryField(idList: number[]): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryDisplayFieldAction.displayFieldList.started(null));
      try {
        const result = await new DictionaryDisplayFieldApiRequest().deleteDisplayField(idList);
        if (result.isError) {
          throw result;
        }
        successPopup(result.result);
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  getBizObjects(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryDisplayFieldAction.bizObjectsList.started(null));
      try {
        const result = await new DictionaryDisplayFieldApiRequest().getBizObjects();
        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryDisplayFieldAction.bizObjectsList.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DictionaryDisplayFieldAction.bizObjectsList.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
  getDictionariesList(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryDisplayFieldAction.dictionariesList.started(null));
      try {
        const result = await new DictionaryDisplayFieldApiRequest().getDictionariesList();
        if (result.isError) {
          throw result;
        }
        dispatch(
          DictionaryDisplayFieldAction.dictionariesList.done({
            params: null,
            result: result.result.map((r) => ({ ...r, description: `${r.code} - ${r.description}` })),
          })
        );
      } catch (error) {
        dispatch(DictionaryDisplayFieldAction.dictionariesList.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
  getTableFields(dictionaryName: string, registerFieldId?: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryDisplayFieldAction.tableFields.started(null));
      try {
        const result = await new DictionaryDisplayFieldApiRequest().getTableFields(dictionaryName, registerFieldId);
        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryDisplayFieldAction.tableFields.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DictionaryDisplayFieldAction.tableFields.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
  getAttributes(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryDisplayFieldAction.attributesList.started(null));
      try {
        const result = await new DictionaryDisplayFieldApiRequest().getAttributes(id);
        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryDisplayFieldAction.attributesList.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DictionaryDisplayFieldAction.attributesList.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
  clearLists(isDictionariesList: boolean, isAttributesList: boolean, isTableFieldList: boolean): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(
        DictionaryDisplayFieldAction.clearLists.done({
          params: { isDictionariesList, isTableFieldList, isAttributesList },
        })
      );
    };
  },

  createDictionaryDisplayField(value: ICreateDisplayField, callback: () => void): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new DictionaryDisplayFieldApiRequest().createDictionaryDisplayField(value);
        if (result.isError) {
          throw result;
        }
        successPopup("Данные сохранены.");
        callback();
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  updateDictionaryDisplayField(value: ICreateDisplayField, callback: () => void): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new DictionaryDisplayFieldApiRequest().updateDictionaryDisplayField(value);
        if (result.isError) {
          throw result;
        }
        callback();
        successPopup("Данные обновлены.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },
};
