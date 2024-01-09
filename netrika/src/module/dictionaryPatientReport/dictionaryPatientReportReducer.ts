import { reducerWithInitialState } from "typescript-fsa-reducers";
import { DictionaryPatientReportAction } from "./dictionaryPatientReportAction";
import { IFunction } from "../../common/interfaces/IFunction";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IPatientReportLogItem } from "../../common/interfaces/patient/IPatientReportLogItem";

export interface IState {
  dictionaryPatientReportList: IPaginateItems<IPatientReportLogItem[]>;
  loading: boolean;

  reportFunction: IFunction[];
  functionLoading: boolean;
}

export const InitialState: IState = {
  dictionaryPatientReportList: {} as IPaginateItems<IPatientReportLogItem[]>,
  loading: true,

  reportFunction: [] as IFunction[],
  functionLoading: true,
};

export const dictionaryPatientReport = reducerWithInitialState(InitialState)
  .case(DictionaryPatientReportAction.patientReportList.started, (state) => ({
    ...state,
    dictionaryPatientReportList: state.dictionaryPatientReportList,
    loading: true,
  }))
  .case(DictionaryPatientReportAction.patientReportList.done, (state, payload) => {
    return {
      ...state,
      dictionaryPatientReportList: payload.result,

      loading: false,
    };
  })
  .case(DictionaryPatientReportAction.patientReportList.failed, (state) => ({
    ...state,
    dictionaryPatientReportList: state.dictionaryPatientReportList,
    loading: false,
  }))
  .case(DictionaryPatientReportAction.patientReportFunction.started, (state) => ({
    ...state,
    reportFunction: state.reportFunction,
    loading: true,
  }))
  .case(DictionaryPatientReportAction.patientReportFunction.done, (state, payload) => {
    return {
      ...state,
      reportFunction: payload.result,
      functionLoading: false,
    };
  })
  .case(DictionaryPatientReportAction.patientReportFunction.failed, (state) => ({
    ...state,
    reportFunction: state.reportFunction,
    functionLoading: false,
  }))

  .build();
