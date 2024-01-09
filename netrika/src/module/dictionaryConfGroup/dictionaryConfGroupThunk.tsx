import { DictionaryConfGroupApiRequest } from "api/dictionaryConfGroupApiRequest";
import { IConfGroupDictionary } from "../../common/interfaces/dictionary/IConfGroupDictionary";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { successPopup } from "../../common/helpers/toast/success";
import { DictionaryConfGroupAction } from "./dictionaryConfGroupAction";
import { IDictionaryConfGroupRequest } from "../../common/interfaces/dictionary/IDictionaryConfGroupRequest";

export const DictionaryConfGroupThunk = {
  getDictionarySearch(data: IDictionaryConfGroupRequest): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryConfGroupAction.dictionaryConfGroup.started(null));
      try {
        const result = await new DictionaryConfGroupApiRequest().getDictionaryWithSearch(data);

        if (result.isError) {
          throw result;
        }

        dispatch(
          DictionaryConfGroupAction.dictionaryConfGroup.done({
            params: null,
            result: result.result,
          })
        );
      } catch (error) {
        dispatch(DictionaryConfGroupAction.dictionaryConfGroup.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  updateConfGroup(value: IConfGroupDictionary): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new DictionaryConfGroupApiRequest().updateCriterionType(value.id, value);
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
