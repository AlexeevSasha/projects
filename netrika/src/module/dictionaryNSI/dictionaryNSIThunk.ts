import { NsiDictionaryApiRequest } from "api/nsiDictionaryApiRequest";
import { successPopup } from "common/helpers/toast/success";
import { IAppDispatch, IAppState, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { DictionaryNSIAction } from "./dictionaryNSIAction";
import { ru } from "../../common/lang/ru";

export const DictionaryNSIThunk = {
  getDictionaryNSIList(
    pageIndex: number,
    pageSize: number,
    searchText: string,
    orderColumn: string,
    orderAsc: boolean
  ): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryNSIAction.dictionaryNSIList.started(null));
      try {
        const result = await new NsiDictionaryApiRequest().getNsiDictionary(
          pageIndex,
          pageSize,
          searchText,
          orderColumn || "dictionaryName",
          orderAsc
        );
        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryNSIAction.dictionaryNSIList.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DictionaryNSIAction.dictionaryNSIList.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
  saveDictionaryNSI(dictionaryOid: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        dispatch(DictionaryNSIAction.infoControlListResult.started(null));

        const result = await new NsiDictionaryApiRequest().updateDictionaryAsync(dictionaryOid);
        dispatch(DictionaryNSIAction.setIdToSession({ id: dictionaryOid, jobId: result.result }));
        dispatch(DictionaryNSIAction.setSessionToken(result.result));

        dispatch(this.callSessionInfo());
      } catch (error) {
        errorPopup(error.message || ru.error.unknown);
      }
    };
  },

  callSessionInfo(): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        const sessionIdList = getState().dictionaryNSI.sessionIdList;
        const activeList = getState().dictionaryNSI.sessionToken;

        const result = await new NsiDictionaryApiRequest().jobsResults();

        if (result.isError) {
          throw result;
        }
        const finishedList: string[] = [];
        sessionIdList.forEach(({ id, jobId }) => {
          const resultControlList = result.result.find((item) => item.jobId === jobId);
          if (resultControlList?.status === "Running") {
            if (activeList === id) {
              dispatch(
                DictionaryNSIAction.infoControlListResult.done({
                  params: null,
                  result: resultControlList.result,
                })
              );
              // Запись последнего загруженного списка
              dispatch(DictionaryNSIAction.updateLastLoadList(id));
              finishedList.push(id);
            }
          } else if (resultControlList?.status === "Error") {
            if (activeList === id) {
              errorPopup(resultControlList.message || ru.error.unknown);
              finishedList.push(id);

              const lastLoadList = getState().dictionaryNSI.lastLoadList;
              if (lastLoadList) dispatch(DictionaryNSIAction.updateActiveList(lastLoadList));
            } else {
              errorPopup(resultControlList.message || ru.error.unknown);
              finishedList.push(id);

              const lastLoadList = getState().dictionaryNSI.lastLoadList;
              if (lastLoadList) dispatch(DictionaryNSIAction.updateActiveList(lastLoadList));
            }
          } else {
            finishedList.push(id);
          }
        });
        dispatch(DictionaryNSIAction.deleteIdToSession(finishedList));
      } catch (error) {
        errorPopup(error.message || ru.error.unknown);
      }
    };
  },
  stopSessionInfo(data: { id: string; jobId?: string }): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        const lastLoadList = getState().dictionaryNSI.lastLoadList;
        if (lastLoadList) {
          dispatch(DictionaryNSIAction.updateActiveList(lastLoadList));
        } else {
          dispatch(DictionaryNSIAction.updateActiveList(data.id));
        }

        const sessionIdList = getState().dictionaryNSI.sessionIdList;
        const sessionId = sessionIdList.find((item) => item.id === data.id);
        const sessionJobIdId = sessionIdList.find((item) => item.jobId === data.jobId);
        let result = null;
        if (data.jobId) {
          result = await new NsiDictionaryApiRequest().interruptJob(data.jobId);
        } else if (sessionId) {
          result = await new NsiDictionaryApiRequest().interruptJob(sessionId?.jobId);
        }
        if (result?.isError) {
          throw result;
        }

        if (data.jobId && sessionJobIdId) {
          dispatch(DictionaryNSIAction.deleteIdToSession([sessionJobIdId.id]));
        } else dispatch(DictionaryNSIAction.deleteIdToSession([data.id]));
        successPopup(result?.result.message || "");
      } catch (error) {
        errorPopup(error.message || ru.error.unknown);
      }
    };
  },

  deleteDictionaryNSI(dictionaryOid: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryNSIAction.dictionaryNSIList.started(null));
      try {
        const result = await new NsiDictionaryApiRequest().deleteDictionary(dictionaryOid);
        if (result.isError) {
          throw result;
        }
        successPopup(result.result);
      } catch (error) {
        dispatch(DictionaryNSIAction.dictionaryNSIList.failed({ params: null, error }));
        errorPopup(error.result + " " + error.message);
      }
    };
  },
};
