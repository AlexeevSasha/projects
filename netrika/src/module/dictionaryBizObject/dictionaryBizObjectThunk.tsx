import { DictionaryBizObjectApiRequest } from "api/dictionaryBizObjectApiRequest";
import { IRegisterBizObjDictionary } from "../../common/interfaces/register/IRegisterBizObjDictionary";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { successPopup } from "../../common/helpers/toast/success";
import { DictionaryBizObjectAction } from "./dictionaryBizObjectAction";

export const DictionaryBizObjectThunk = {
  getDictionarySearch(pageIndex: number, pageSize: number, searchText: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryBizObjectAction.dictionaryBizObject.started(null));
      try {
        const result = await new DictionaryBizObjectApiRequest().getDictionaryWithSearch(
          pageIndex,
          pageSize,
          searchText
        );

        if (result.isError) {
          throw result;
        }
        dispatch(
          DictionaryBizObjectAction.dictionaryBizObject.done({
            params: null,
            result: result.result,
          })
        );
      } catch (error) {
        dispatch(DictionaryBizObjectAction.dictionaryBizObject.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  createBizObject(value: IRegisterBizObjDictionary): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryBizObjectAction.dictionaryBizObject.started(null));
      try {
        const result = await new DictionaryBizObjectApiRequest().createBizObj(value);
        if (result.isError) {
          throw result;
        }
        successPopup("Элемент справочника успешно добавлен.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  updateBizObject(value: IRegisterBizObjDictionary): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryBizObjectAction.dictionaryBizObject.started(null));
      try {
        const result = await new DictionaryBizObjectApiRequest().updateDictionary(value.id, value);
        if (result.isError) {
          throw result;
        }
        successPopup("Элемент справочника успешно изменён.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  deleteBizObject(id: number[]): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryBizObjectAction.dictionaryBizObject.started(null));
      try {
        const result = await new DictionaryBizObjectApiRequest().deleteDiseaseGroup(id);
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
