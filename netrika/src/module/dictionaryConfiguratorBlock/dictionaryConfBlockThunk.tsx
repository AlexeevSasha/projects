import { DictionaryConfiguratorBlockApiRequest } from "api/dictionaryConfiguratorBlockApiRequest";
import { IConfBlockDictionary } from "../../common/interfaces/dictionary/IConfBlockDictionary";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { successPopup } from "../../common/helpers/toast/success";
import { DictionaryConfBlockAction } from "./dictionaryConfBlockAction";

export const DictionaryConfBlockThunk = {
  getDictionarySearch(pageIndex: number, pageSize: number, searchText: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryConfBlockAction.dictionaryConfBlock.started(null));
      try {
        const result = await new DictionaryConfiguratorBlockApiRequest().getDictionaryWithSearch(
          pageIndex,
          pageSize,
          searchText
        );
        if (result.isError) {
          throw result;
        }
        dispatch(
          DictionaryConfBlockAction.dictionaryConfBlock.done({
            params: null,
            result: result.result,
          })
        );
      } catch (error) {
        dispatch(
          DictionaryConfBlockAction.dictionaryConfBlock.failed({
            params: null,
            error,
          })
        );
        errorPopup(error.message);
      }
    };
  },

  updateConfBlock(value: IConfBlockDictionary): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryConfBlockAction.dictionaryConfBlock.started(null));
      try {
        const result = await new DictionaryConfiguratorBlockApiRequest().updateConfBlock(value.id, value);
        if (result?.isError) {
          throw result;
        }
        successPopup("Элемент справочника успешно изменён.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },
};
