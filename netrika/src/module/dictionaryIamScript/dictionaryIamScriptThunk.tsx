import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { successPopup } from "../../common/helpers/toast/success";
import { DictionaryIamScriptAction } from "./dictionaryIamScriptAction";
import { DictionaryIamScriptRequest } from "../../api/dictionaryScriptsApiReqest";
import { CreateIamScriptDto, UpdateIamScriptDto } from "../../common/interfaces/IamScriptDto";

export const DictionaryIamScriptThunk = {
  getDictionaryIamScriptParamType(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryIamScriptAction.paramTypes.started(null));
      try {
        const result = await new DictionaryIamScriptRequest().getIamScriptsParamType();
        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryIamScriptAction.paramTypes.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DictionaryIamScriptAction.paramTypes.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  iamScriptsCountParams(value: string, callback: (v: string[]) => void): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryIamScriptAction.loadCountParams.started(null));
      try {
        const result = await new DictionaryIamScriptRequest().IamScriptsCountParams(value);
        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryIamScriptAction.loadCountParams.done({ params: null }));

        callback(result.result.paramNames);
      } catch (error) {
        dispatch(DictionaryIamScriptAction.loadCountParams.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
  getDictionaryIamScriptList(pageIndex: number, pageSize: number, searchText: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryIamScriptAction.iamScriptList.started(null));
      try {
        const result = await new DictionaryIamScriptRequest().getIamScripts(pageIndex, pageSize, searchText);
        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryIamScriptAction.iamScriptList.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DictionaryIamScriptAction.iamScriptList.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  createIamScript(data: CreateIamScriptDto): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryIamScriptAction.iamScriptList.started(null));
      try {
        const result = await new DictionaryIamScriptRequest().createIamScripts(data);
        if (result.isError) {
          throw result;
        }
        successPopup(result.message);
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  updateIamScript(data: UpdateIamScriptDto): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryIamScriptAction.iamScriptList.started(null));
      try {
        const result = await new DictionaryIamScriptRequest().updateIamScripts(data);
        if (result.isError) {
          throw result;
        }
        successPopup(result.message);
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  deleteIamScripts(registerGroupId: number[]): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryIamScriptAction.iamScriptList.started(null));
      try {
        const result = await new DictionaryIamScriptRequest().deleteIamScripts(registerGroupId);
        if (result.isError) {
          throw result;
        }
        successPopup(result.message);
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },
};
