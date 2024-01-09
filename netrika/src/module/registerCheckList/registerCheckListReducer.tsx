import { reducerWithInitialState } from "typescript-fsa-reducers";
import { IControlList } from "../../common/interfaces/control/IControlList";
import { RegisterCheckListAction } from "./registerCheckListAction";
import { IControlListsFields } from "../../common/interfaces/control/IControlListsField";
import { IControlListsFilter } from "../../common/interfaces/control/IControlListsFilter";
import { RegisterFieldTypeEnum } from "../../common/interfaces/RegisterFieldTypeEnum";
import { IFilter } from "../../common/interfaces/IFilter";
import { ComparisonOperatorEnum } from "../../common/interfaces/ComparisonOperatorEnum";
import { ComparisonValueTypeEnum } from "../../common/interfaces/ComparisonValueTypeEnum.g";

export interface IDownloadXls {
  isFile: boolean;
  file?: Blob;
  name?: string;
}

export interface IState {
  controlList: IControlList[];
  activeList: number;
  lastLoadList?: number;
  patientList: { Total: number; items: any[]; itemsNames: any[] };
  loadingControl: boolean;
  loadingPatient: boolean;
  isDownloadXls: boolean;
  queryLoadingXls: number[];
  queryLoadingCsv: number[];
  controlListFields: IControlListsFields;
  loadingControlListFields: boolean;

  controlListFilter: IControlListsFilter;
  loadingControlListFilter: boolean;
  queryLoadingXlsPatientCase: number[];

  controlListFilterError: string;
  defVal: {
    bizId: number;
    id: number;
    description: string;
    type: RegisterFieldTypeEnum;
    hasDictionaryValues: boolean;
    values: IFilter["values"];
    comparisons: {
      value: string;
      label: string;
      operator: ComparisonOperatorEnum;
      display: string;
      availableTypes: RegisterFieldTypeEnum[];
      comparisonValueType: ComparisonValueTypeEnum;
      useDictionaryValues: boolean;
    }[];
    comparisonValue?: ComparisonOperatorEnum | string;
  }[];
}

export const InitialState: IState = {
  controlList: [],
  activeList: 0,
  lastLoadList: undefined,
  patientList: { Total: 0, items: [], itemsNames: [] },
  loadingControl: true,
  loadingPatient: true,

  isDownloadXls: false,
  queryLoadingXls: [],
  queryLoadingCsv: [],

  queryLoadingXlsPatientCase: [],

  loadingControlListFields: false,
  controlListFields: {} as IControlListsFields,

  controlListFilter: {} as IControlListsFilter,
  loadingControlListFilter: false,

  controlListFilterError: "",
  defVal: [],
};
export const registerCheckListReducer = reducerWithInitialState(InitialState)
  .case(RegisterCheckListAction.infoControlList.started, (state) => ({
    ...state,
    loadingControl: true,
  }))
  .case(RegisterCheckListAction.infoControlList.done, (state, payload) => ({
    ...state,
    controlList: payload.result,
    loadingControl: false,
  }))
  .case(RegisterCheckListAction.infoControlList.failed, (state) => ({
    ...state,
    loadingControl: false,
  }))
  .case(RegisterCheckListAction.controlListFields.started, (state) => ({
    ...state,
    loadingControlListFields: true,
  }))
  .case(RegisterCheckListAction.controlListFields.done, (state, payload) => ({
    ...state,
    controlListFields: payload.result,
    loadingControlListFields: false,
  }))
  .case(RegisterCheckListAction.controlListFields.failed, (state) => ({
    ...state,
    loadingControlListFields: false,
  }))
  .case(RegisterCheckListAction.controlListFilterError, (state, payload) => ({
    ...state,
    controlListFilterError: payload,
  }))
  .case(RegisterCheckListAction.controlListFilter.started, (state) => ({
    ...state,
    loadingControlListFilter: true,
  }))
  .case(RegisterCheckListAction.controlListFilter.done, (state, payload) => ({
    ...state,
    controlListFilter: payload.result,
    loadingControlListFilter: false,
  }))
  .case(RegisterCheckListAction.controlListFilter.failed, (state, error) => ({
    ...state,
    loadingControlListFilter: false,
    controlListFilterError: error.error.message,
  }))

  .case(RegisterCheckListAction.infoControlListResult.started, (state) => ({
    ...state,
    loadingPatient: true,
  }))
  .case(RegisterCheckListAction.infoControlListResult.done, (state, payload) => ({
    ...state,
    patientList: payload.result,
    loadingPatient: false,
  }))
  .case(RegisterCheckListAction.infoControlListResult.failed, (state) => ({
    ...state,
    loadingPatient: false,
  }))

  .case(RegisterCheckListAction.updateActiveList, (state, payload) => ({
    ...state,
    activeList: payload,
    loadingPatient: false,
  }))

  .case(RegisterCheckListAction.updateLastLoadList, (state, payload) => ({
    ...state,
    lastLoadList: payload,
  }))

  // Обновляет количество пациентов в таблице после запроса списка пациентов
  .case(RegisterCheckListAction.updateInfoControlList, (state, payload) => ({
    ...state,
    controlList: payload,
  }))

  // Проверка можно ли загрузить файл
  .case(RegisterCheckListAction.checkLoadXls.started, (state) => ({
    ...state,
    isDownloadXls: false,
  }))
  .case(RegisterCheckListAction.checkLoadXls.done, (state, payload) => ({
    ...state,
    isDownloadXls: payload.result,
  }))

  .case(RegisterCheckListAction.checkLoadXls.failed, (state) => ({
    ...state,
    isDownloadXls: false,
  }))

  // Загрузка файла
  .case(RegisterCheckListAction.getInfoXls.started, (state, payload) => ({
    ...state,
    queryLoadingXls: [...state.queryLoadingXls, payload],
  }))
  .case(RegisterCheckListAction.getInfoXls.done, (state, payload) => ({
    ...state,
    downloadXls: payload.result,
    queryLoadingXls: state.queryLoadingXls.filter((q) => q !== payload.params),
  }))
  .case(RegisterCheckListAction.getInfoXls.failed, (state, payload) => ({
    ...state,
    queryLoadingXls: state.queryLoadingXls.filter((q) => q !== payload.params),
  }))

  .case(RegisterCheckListAction.getInfoCsv.started, (state, payload) => ({
    ...state,
    queryLoadingCsv: [...state.queryLoadingCsv, payload],
  }))
  .case(RegisterCheckListAction.getInfoCsv.done, (state, payload) => ({
    ...state,
    queryLoadingCsv: state.queryLoadingCsv.filter((q) => q !== payload.params),
  }))
  .case(RegisterCheckListAction.getInfoCsv.failed, (state, payload) => ({
    ...state,
    queryLoadingCsv: state.queryLoadingCsv.filter((q) => q !== payload.params),
  }))

  .case(RegisterCheckListAction.getInfoXlsPatientCase.started, (state, payload) => ({
    ...state,
    queryLoadingXlsPatientCase: [...state.queryLoadingXlsPatientCase, payload],
  }))
  .case(RegisterCheckListAction.getInfoXlsPatientCase.done, (state, payload) => ({
    ...state,
    downloadXlsPatientCase: payload.result,
    queryLoadingXlsPatientCase: state.queryLoadingXlsPatientCase.filter((q) => q !== payload.params),
  }))
  .case(RegisterCheckListAction.getInfoXlsPatientCase.failed, (state, payload) => ({
    ...state,
    queryLoadingXlsPatientCase: state.queryLoadingXlsPatientCase.filter((q) => q !== payload.params),
  }))

  .case(RegisterCheckListAction.defVal.done, (state, payload) => {
    return { ...state, defVal: payload.result, controlListFilterError: "" };
  })

  .build();
