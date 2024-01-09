import { RegisterControlListApiRequest } from "api/registerControlListApiRequest";
import { RegisterCheckListSessionThunk } from "module/registerCheckListSession/registerCheckListSessionThunk";
import { ru } from "common/lang/ru";
import { IAppDispatch, IAppState, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { RegisterCheckListAction } from "./registerCheckListAction";
import { SortingControlListDto } from "../../common/interfaces/control/IControlList";
import { successPopup } from "../../common/helpers/toast/success";
import { IControlListsFields } from "../../common/interfaces/control/IControlListsField";
import { IControlListsFilter } from "../../common/interfaces/control/IControlListsFilter";

export const RegisterCheckListThunk = {
  getControlList(id: number, activeList?: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterCheckListAction.infoControlList.started(null));
      try {
        const result = await new RegisterControlListApiRequest().getControlLists(id);

        if (result.isError) {
          throw result;
        }
        if (result.result.length === 0) {
          throw new Error("Отсутствует дефолтный контрольный список. Обратитесь к администратору.");
        }

        dispatch(RegisterCheckListAction.updateActiveList(Number(activeList) || result.result[0].id));
        dispatch(RegisterCheckListSessionThunk.addIdToSession(Number(activeList) || result.result[0].id, 1, 50));
        dispatch(RegisterCheckListAction.infoControlList.done({ params: null, result: result.result }));
      } catch (error) {
        errorPopup(error.message || ru.error.unknown);
        dispatch(RegisterCheckListAction.infoControlList.failed({ params: null, error }));
      }
    };
  },
  sortControlList(sortingControlList: SortingControlListDto[], errorReset: () => void): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterCheckListAction.sortingControlList.started(null));
      try {
        const result = await new RegisterControlListApiRequest().sortControlList(sortingControlList);
        if (result.isError) {
          throw result;
        }
        successPopup("Сортировка контрольных списков произошла успешно");
      } catch (error) {
        errorPopup(error.message || "При сортировке контрольных списков произошла неизвестная ошибка");
        errorReset();
        dispatch(RegisterCheckListAction.sortingControlList.failed({ params: null, error }));
      }
    };
  },

  downloadXls(params: number, filter: string, downloadFunction: (file: Blob) => void): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        dispatch(RegisterCheckListAction.getInfoXls.started(params));
        const result = await new RegisterControlListApiRequest().downloadXls(params, filter);

        if (result?.isError) {
          throw result;
        }
        dispatch(
          RegisterCheckListAction.getInfoXls.done({
            params: params,
            result: { isFile: true, file: result as Blob },
          })
        );
        downloadFunction(result);
      } catch (error) {
        errorPopup(error.message);
        dispatch(RegisterCheckListAction.getInfoXls.failed({ params: params, error }));
      }
    };
  },
  downloadCsv(params: number, filter: string, downloadFunction: (file: Blob) => void): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        dispatch(RegisterCheckListAction.getInfoCsv.started(params));
        const result = await new RegisterControlListApiRequest().downloadCsv(params, filter);

        if (result?.isError) throw result;
        dispatch(
          RegisterCheckListAction.getInfoCsv.done({
            params: params,
            result: { isFile: true, file: result as Blob },
          })
        );
        downloadFunction(result);
      } catch (error) {
        errorPopup(error.message);
        dispatch(RegisterCheckListAction.getInfoCsv.failed({ params: params, error }));
      }
    };
  },
  downloadXlsPatientCase(params: number, downloadFunction: (file: Blob) => void): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        dispatch(RegisterCheckListAction.getInfoXlsPatientCase.started(params));
        const result = await new RegisterControlListApiRequest().downloadXlsPatientCase(params);
        if (result?.isError) {
          throw result;
        }

        dispatch(
          RegisterCheckListAction.getInfoXlsPatientCase.done({
            params: params,
            result: { isFile: true, file: result },
          })
        );
        downloadFunction(result);
      } catch (error) {
        errorPopup(error.message);
        dispatch(RegisterCheckListAction.getInfoXlsPatientCase.failed({ params: params, error }));
      }
    };
  },

  checkDownloadXls(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterCheckListAction.controlListFields.started(null));
      try {
        const result = await new RegisterControlListApiRequest().checkDownloadOption();
        if (result.isError) {
          throw result;
        }
        dispatch(RegisterCheckListAction.checkLoadXls.done({ params: null, result: result.result }));
      } catch (error) {
        errorPopup(error.message);
        dispatch(RegisterCheckListAction.checkLoadXls.failed({ params: null, error }));
      }
    };
  },
  getControlListsFields(params: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterCheckListAction.controlListFields.started(null));
      try {
        const result = await new RegisterControlListApiRequest().getControlListsFields(params);
        if (result.isError) {
          throw result;
        }

        dispatch(RegisterCheckListAction.controlListFields.done({ params: null, result: result.result }));
      } catch (error) {
        errorPopup(error.message);
        dispatch(RegisterCheckListAction.controlListFields.failed(error));
      }
    };
  },
  updateControlListsFields(
    controlListsFields: IControlListsFields,
    controlListId: number,
    updateTable?: () => void
  ): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterCheckListAction.controlListFields.started(null));
      try {
        const result = await new RegisterControlListApiRequest().updateControlListsFields(
          controlListsFields,
          controlListId
        );
        if (result.isError) {
          throw result;
        }
        dispatch(RegisterCheckListAction.controlListFields.done({ params: null, result: result.result }));
        updateTable && updateTable();
        successPopup(result.message);
      } catch (error) {
        errorPopup(error.message || "произошла неизвестная ошибка");
        dispatch(RegisterCheckListAction.controlListFields.failed({ params: null, error }));
      }
    };
  },

  getControlListsFilter(params: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterCheckListAction.controlListFilter.started(null));
      try {
        const result = await new RegisterControlListApiRequest().getControlListsFilter(params);
        if (result.isError) {
          throw result;
        }
        dispatch(RegisterCheckListAction.controlListFilter.done({ params: null, result: result.result }));
      } catch (error) {
        errorPopup(error.message);
        dispatch(RegisterCheckListAction.controlListFilter.failed(error));
      }
    };
  },

  getControlListsFilter2(): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      const filteredControlListFields = new Set(
        getState()
          .registerCheckList.controlListFields.fields?.filter((item) => item.isVisible)
          ?.map((item) => item.id)
      );
      const filteredBizObjWithFieldsId = new Set(
        getState()
          .registerCheckList.patientList.itemsNames?.filter((item) => filteredControlListFields.has(item?.Id))
          ?.map((item) => item?.IdBizObj)
      );
      const optionsBizObjWithFields = getState()
        .filterReducer.selects.bizObjWithFields?.map((item) => ({ ...item, value: item.id, label: item.name }))
        .filter((item) => filteredBizObjWithFieldsId.has(item.id));

      const val = optionsBizObjWithFields
        .map((biz) => ({
          fields: biz.fields
            ?.filter((f) => filteredControlListFields.has(Number(f.id)))
            ?.map((m) => ({
              ...m,
              bizId: biz.id,
              values: [],
              comparisonValue: "",
              comparisons: getState()
                .filterReducer.selects.comparison.filter((item) => item.availableTypes.find((item) => item === m.type))
                .map((item) => ({ ...item, value: item.display, label: item.display })),
            })),
        }))
        .flatMap((i) => i.fields);
      dispatch(RegisterCheckListAction.defVal.done({ params: null, result: val }));
    };
  },
  updateControlListsFilter(
    controlListsFilter: IControlListsFilter,
    controlListId: number,
    updateTable?: () => void
  ): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterCheckListAction.controlListFilter.started(null));
      try {
        const result = await new RegisterControlListApiRequest().updateControlListsFilter(
          controlListsFilter,
          controlListId
        );
        if (result.isError) {
          throw result;
        }
        updateTable && updateTable();
        dispatch(RegisterCheckListAction.controlListFilter.done({ params: null, result: result.result }));
        successPopup(result.message);
      } catch (error) {
        // errorPopup(error.message || "произошла неизвестная ошибка");

        await dispatch(RegisterCheckListAction.controlListFilter.failed({ params: null, error }));
        dispatch(RegisterCheckListAction.controlListFilterError(error.message || "произошла неизвестная ошибка"));
      }
    };
  },
};
