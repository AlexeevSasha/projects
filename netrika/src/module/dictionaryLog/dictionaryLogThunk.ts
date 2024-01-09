import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { DictionaryLogApiRequest } from "../../api/dictionaryLogApiRequest";
import { DictionaryLogAction } from "./dictionaryLogAction";

export const DictionaryLogThunk = {
  getDictionarySearch(pageIndex: number, pageSize: number, searchText: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryLogAction.LogList.started(null));
      try {
        const result = await new DictionaryLogApiRequest().getDictionaryLog(pageIndex, pageSize, searchText);
        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryLogAction.LogList.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DictionaryLogAction.LogList.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
};
