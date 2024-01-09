import { reducerWithInitialState } from "typescript-fsa-reducers";
import { DictionaryClinrecPompAction } from "./dictionaryClinrecPompAction";
import { IDictionaryClinrecActivity, IDictionaryClinrec } from "../../common/interfaces/dictionary/IDictionaryClinrec";
import { IDictionaryPompActivity, IDictionaryPomp } from "../../common/interfaces/dictionary/IDictionaryPomp";
import { IInfoForCreateClinrec } from "../../common/interfaces/IInfoForCreateClinrec";
import { ICustomBaseSelect } from "../../common/interfaces/ISelect";

export interface IState {
  pomp: IDictionaryPomp[];
  loading: boolean;
  clinrec: IDictionaryClinrec[];
  clinrecSelects: IInfoForCreateClinrec;
  pompList: ICustomBaseSelect[];
  profiles: ICustomBaseSelect[];
  loadingPompProfiles: boolean;
  loadingPompList: boolean;

  listTimeoutUnit: ICustomBaseSelect[];
  loadingListTimeoutUnit: boolean;

  loadingClinrecSelects: boolean;
  loadingClinrec: boolean;
  loadingClinrecSelectsClinrecList: boolean;
  loadingClinrecStage: boolean;
  loadingClinrecThesis: boolean;
  loadingClinrecActivity: boolean;
  loadingPompActivity: boolean;

  loadingPomp: boolean;
  loadingGraph: boolean;
  loadingPompStage: boolean;
  loadingPompState: boolean;
  totalCount: number;

  activityForModal: null | IDictionaryPompActivity[] | IDictionaryClinrecActivity[];
}

export const InitialState: IState = {
  pomp: [],
  clinrec: [],
  totalCount: 0,
  clinrecSelects: {} as IInfoForCreateClinrec,
  pompList: [] as ICustomBaseSelect[],
  profiles: [] as ICustomBaseSelect[],
  listTimeoutUnit: [],

  loadingListTimeoutUnit: false,
  loading: false,
  loadingPomp: false,
  loadingClinrec: false,
  loadingClinrecStage: false,
  loadingClinrecThesis: false,
  loadingClinrecActivity: false,
  loadingPompActivity: false,

  loadingClinrecSelects: false,
  loadingClinrecSelectsClinrecList: false,
  loadingPompList: false,
  loadingPompProfiles: false,
  loadingGraph: false,
  loadingPompStage: false,
  loadingPompState: false,

  activityForModal: null,
};

export const dictionaryClinrecPompReducer = reducerWithInitialState(InitialState)
  .case(DictionaryClinrecPompAction.pomp.started, (state) => ({
    ...state,
    loading: true,
    pomp: [] as IDictionaryPomp[],
  }))
  .case(DictionaryClinrecPompAction.pomp.done, (state, payload) => ({
    ...state,
    pomp: payload.result.items,
    totalCount: payload.result.totalCount,
    loading: false,
  }))
  .case(DictionaryClinrecPompAction.pomp.failed, (state) => ({
    ...state,
    pomp: [],
    loading: false,
    totalCount: 0,
  }))
  .case(DictionaryClinrecPompAction.updatePomp.started, (state) => ({
    ...state,
  }))
  .case(DictionaryClinrecPompAction.updatePomp.done, (state, payload) => ({
    ...state,
    pomp: payload.result,
  }))
  .case(DictionaryClinrecPompAction.updatePomp.failed, (state) => ({
    ...state,
  }))

  .case(DictionaryClinrecPompAction.clinrec.started, (state) => ({
    ...state,
    loading: true,
    clinrec: [],
  }))
  .case(DictionaryClinrecPompAction.clinrec.done, (state, payload) => ({
    ...state,
    clinrec: payload.result.items,
    totalCount: payload.result.totalCount,
    loading: false,
  }))
  .case(DictionaryClinrecPompAction.clinrec.failed, (state) => ({
    ...state,
    totalCount: 0,
    clinrec: [],
    loading: false,
  }))
  .case(DictionaryClinrecPompAction.updateClinrec.started, (state) => ({
    ...state,
  }))
  .case(DictionaryClinrecPompAction.updateClinrec.done, (state, payload) => ({
    ...state,
    clinrec: payload.result,
  }))
  .case(DictionaryClinrecPompAction.updateClinrec.failed, (state) => ({
    ...state,
  }))
  .case(DictionaryClinrecPompAction.infoForCreateClinrec.started, (state) => ({
    ...state,
    loadingClinrecSelects: true,
  }))
  .case(DictionaryClinrecPompAction.infoForCreateClinrec.done, (state, payload) => ({
    ...state,
    clinrecSelects: {
      ...state.clinrecSelects,
      clinrecStatus: payload.result.clinrecStatus,
      clinrecUsageStatus: payload.result.clinrecUsageStatus,
      ageCategory: payload.result.ageCategory,
    },
    loadingClinrecSelects: false,
  }))

  .case(DictionaryClinrecPompAction.infoForCreateClinrec.failed, (state) => ({
    ...state,
    loadingClinrecSelectsClinrecList: false,
  }))
  .case(DictionaryClinrecPompAction.clinrecListForCreate.started, (state) => ({
    ...state,
    loadingClinrecSelectsClinrecList: true,
  }))
  .case(DictionaryClinrecPompAction.clinrecListForCreate.done, (state, payload) => ({
    ...state,
    clinrecSelects: { ...state.clinrecSelects, clinrecList: payload.result },
    loadingClinrecSelectsClinrecList: false,
  }))

  .case(DictionaryClinrecPompAction.clinrecListForCreate.failed, (state) => ({
    ...state,
    loadingClinrecSelects: false,
  }))

  .case(DictionaryClinrecPompAction.createClinrecBasedOn.started, (state) => ({
    ...state,
    loadingClinrecSelects: true,
  }))
  .case(DictionaryClinrecPompAction.createClinrecBasedOn.done, (state) => ({
    ...state,
    loadingClinrecSelects: false,
  }))
  .case(DictionaryClinrecPompAction.createClinrecBasedOn.failed, (state) => ({
    ...state,
    loadingClinrecSelects: false,
  }))
  .case(DictionaryClinrecPompAction.pompList.started, (state) => ({
    ...state,
    loadingPompList: true,
  }))
  .case(DictionaryClinrecPompAction.pompList.done, (state, payload) => ({
    ...state,
    pompList: payload.result,
    loadingPompList: false,
  }))
  .case(DictionaryClinrecPompAction.pompList.failed, (state) => ({
    ...state,
    loadingPompList: false,
  }))
  .case(DictionaryClinrecPompAction.pompsProfiles.started, (state) => ({
    ...state,
    loadingPompProfiles: true,
  }))
  .case(DictionaryClinrecPompAction.pompsProfiles.done, (state, payload) => ({
    ...state,
    profiles: payload.result,
    loadingPompProfiles: false,
  }))
  .case(DictionaryClinrecPompAction.pompsProfiles.failed, (state) => ({
    ...state,
    loadingPompProfiles: false,
  }))

  .case(DictionaryClinrecPompAction.createPomp.started, (state) => ({
    ...state,
    loadingPompSelects: true,
  }))
  .case(DictionaryClinrecPompAction.createPomp.done, (state) => ({
    ...state,
    loadingPompSelects: false,
  }))
  .case(DictionaryClinrecPompAction.createPomp.failed, (state) => ({
    ...state,
    loadingPompSelects: false,
  }))
  .case(DictionaryClinrecPompAction.createGraph.started, (state) => ({
    ...state,
    loadingGraph: true,
  }))
  .case(DictionaryClinrecPompAction.createGraph.done, (state) => ({
    ...state,
    loadingGraph: false,
  }))
  .case(DictionaryClinrecPompAction.createGraph.failed, (state) => ({
    ...state,
    loadingGraph: false,
  }))
  .case(DictionaryClinrecPompAction.createClinrecStage.started, (state) => ({
    ...state,
    loadingClinrecStage: true,
  }))
  .case(DictionaryClinrecPompAction.createClinrecStage.done, (state) => ({
    ...state,
    loadingClinrecStage: false,
  }))
  .case(DictionaryClinrecPompAction.createClinrecStage.failed, (state) => ({
    ...state,
    loadingClinrecStage: false,
  }))
  .case(DictionaryClinrecPompAction.createClinrecThesis.started, (state) => ({
    ...state,
    loadingClinrecThesis: true,
  }))
  .case(DictionaryClinrecPompAction.createClinrecThesis.done, (state) => ({
    ...state,
    loadingClinrecThesis: false,
  }))
  .case(DictionaryClinrecPompAction.createClinrecThesis.failed, (state) => ({
    ...state,
    loadingClinrecThesis: false,
  }))
  .case(DictionaryClinrecPompAction.createClinrecActivity.started, (state) => ({
    ...state,
    loadingClinrecActivity: true,
  }))
  .case(DictionaryClinrecPompAction.createClinrecActivity.done, (state) => ({
    ...state,
    loadingClinrecActivity: false,
  }))
  .case(DictionaryClinrecPompAction.createClinrecActivity.failed, (state) => ({
    ...state,
    loadingClinrecActivity: false,
  }))
  .case(DictionaryClinrecPompAction.createPompStage.started, (state) => ({
    ...state,
    loadingPompStage: true,
  }))
  .case(DictionaryClinrecPompAction.createPompStage.done, (state) => ({
    ...state,
    loadingPompStage: false,
  }))
  .case(DictionaryClinrecPompAction.createPompStage.failed, (state) => ({
    ...state,
    loadingPompStage: false,
  }))
  .case(DictionaryClinrecPompAction.createPompState.started, (state) => ({
    ...state,
    loadingPompState: true,
  }))
  .case(DictionaryClinrecPompAction.createPompState.done, (state) => ({
    ...state,
    loadingPompState: false,
  }))
  .case(DictionaryClinrecPompAction.createPompState.failed, (state) => ({
    ...state,
    loadingPompState: false,
  }))
  .case(DictionaryClinrecPompAction.sortingClinrecStage.started, (state) => ({
    ...state,
  }))
  .case(DictionaryClinrecPompAction.sortingClinrecStage.done, (state, payload) => ({
    ...state,
    clinrec: payload.result,
    loadingPomp: false,
  }))

  .case(DictionaryClinrecPompAction.createPompActivity.started, (state) => ({
    ...state,
    loadingPompActivity: true,
  }))
  .case(DictionaryClinrecPompAction.createPompActivity.done, (state) => ({
    ...state,
    loadingPompActivity: false,
  }))
  .case(DictionaryClinrecPompAction.createPompActivity.failed, (state) => ({
    ...state,
    loadingPompActivity: false,
  }))
  .case(DictionaryClinrecPompAction.sortingClinrecStage.failed, (state) => ({
    ...state,
    loadingPomp: false,
  }))
  .case(DictionaryClinrecPompAction.sortingPompStage.started, (state) => ({
    ...state,
  }))
  .case(DictionaryClinrecPompAction.sortingPompStage.done, (state, payload) => ({
    ...state,
    pomp: payload.result,
    loadingPomp: false,
  }))
  .case(DictionaryClinrecPompAction.sortingPompStage.failed, (state) => ({
    ...state,
    loadingPomp: false,
  }))
  .case(DictionaryClinrecPompAction.activityForModal, (state, payload) => ({ ...state, activityForModal: payload }))

  .case(DictionaryClinrecPompAction.listTimeoutUnit.started, (state) => ({
    ...state,
    loadingListTimeoutUnit: true,
  }))
  .case(DictionaryClinrecPompAction.listTimeoutUnit.done, (state, payload) => ({
    ...state,
    listTimeoutUnit: payload.result,
    loadingListTimeoutUnit: false,
  }))
  .case(DictionaryClinrecPompAction.listTimeoutUnit.failed, (state) => ({
    ...state,
    loadingListTimeoutUnit: true,
  }))
  .build();
