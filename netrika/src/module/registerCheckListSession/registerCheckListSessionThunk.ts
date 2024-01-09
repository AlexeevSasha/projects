import { RegisterControlListApiRequest } from "api/registerControlListApiRequest";
import { RegisterCheckListAction } from "module/registerCheckList/registerCheckListAction";
import { ru } from "common/lang/ru";
import { IAppDispatch, IAppState, IThunkAction } from "store/mainReducer";
import { errorPopup } from "common/helpers/toast/error";
import { RegisterCheckListSessionAction } from "./registerCheckListSessionAction";

export const RegisterCheckListSessionThunk = {
  addIdToSession(
    id: number,
    page: number,
    count: number,
    filter?: string,
    orderColumn?: string,
    orderAsc?: boolean
  ): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        const sessionToken = getState().registerCheckListSession.sessionToken;

        dispatch(RegisterCheckListAction.infoControlListResult.started(null));
        if (filter && sessionToken) {
          await new RegisterControlListApiRequest().interruptJob(sessionToken);
        }

        const result = await new RegisterControlListApiRequest().getControlListItemsAsync(
          id,
          page,
          count,
          filter,
          orderColumn,
          orderAsc
        );

        dispatch(RegisterCheckListSessionAction.setIdToSession({ id, jobId: result.result }));
        dispatch(RegisterCheckListSessionAction.setSessionToken(result.result));

        dispatch(this.callSessionInfo());
      } catch (error) {
        errorPopup(error.message || ru.error.unknown);
      }
    };
  },

  callSessionInfo(): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        const sessionIdList = getState().registerCheckListSession.sessionIdList;
        const activeList = getState().registerCheckList.activeList;

        const result = await new RegisterControlListApiRequest().jobsResults();

        if (result.isError) {
          throw result;
        }

        let newControlList = getState().registerCheckList.controlList;
        const finishedList: number[] = [];

        sessionIdList.forEach(({ id, jobId }) => {
          const resultControlList = result.result.find((item) => item.jobId === jobId);

          if (resultControlList?.status === "Done") {
            if (activeList === id) {
              dispatch(
                RegisterCheckListAction.infoControlListResult.done({
                  params: null,
                  result: resultControlList.result,
                })
              );
              // Запись последнего загруженного списка
              dispatch(RegisterCheckListAction.updateLastLoadList(id));
              // Обновление количества пациентов в активном списке
              newControlList = newControlList.map((item, index) => {
                if (item.id === id) {
                  return {
                    ...item,
                    patientCount:
                      resultControlList.result["Total"] !== -2
                        ? resultControlList.result["Total"]
                        : getState().registerCheckList.controlList[index].patientCount,
                    itemsCount:
                      resultControlList.result["Total"] !== -2
                        ? resultControlList.result["Total"]
                        : getState().registerCheckList.controlList[index].itemsCount,
                  };
                }
                return item;
              });
            } else {
              // Обновление количества пациентов в списке
              newControlList = newControlList.map((item) => {
                if (item.id === id) {
                  return {
                    ...item,
                    patientCount: resultControlList.result["Total"],
                    itemsCount: resultControlList.result["Total"],
                  };
                }
                return item;
              });
            }
            finishedList.push(id);
          } else if (resultControlList?.status === "Error") {
            if (activeList === id) {
              errorPopup(resultControlList.errorMessage || ru.error.unknown);
              finishedList.push(id);

              const lastLoadList = getState().registerCheckList.lastLoadList;
              if (lastLoadList) dispatch(RegisterCheckListAction.updateActiveList(lastLoadList));
            } else {
              finishedList.push(id);
            }
          }
        });

        dispatch(RegisterCheckListAction.updateInfoControlList(newControlList));

        dispatch(RegisterCheckListSessionAction.deleteIdToSession(finishedList));
      } catch (error) {
        errorPopup(error.message || ru.error.unknown);
      }
    };
  },

  stopSessionInfo(id: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        const lastLoadList = getState().registerCheckList.lastLoadList;
        if (lastLoadList) {
          dispatch(RegisterCheckListAction.updateActiveList(lastLoadList));
        } else {
          dispatch(RegisterCheckListAction.updateActiveList(id));
        }

        const sessionIdList = getState().registerCheckListSession.sessionIdList;
        const sessionId = sessionIdList.find((item) => item.id === id);

        if (sessionId) {
          await new RegisterControlListApiRequest().interruptJob(sessionId?.jobId);
        }

        dispatch(RegisterCheckListSessionAction.deleteIdToSession([id]));
      } catch (error) {
        errorPopup(error.message || ru.error.unknown);
      }
    };
  },
};
