import { reducerWithInitialState } from "typescript-fsa-reducers";
import { ProposalQualityRequirementsAction } from "./proposalQualityRequirementsAction";
import { ICustomSelect } from "../../common/interfaces/ISelect";
import {
  IOrderQualityCriterionCurrentItem,
  IOrderQualityCriterionLIstItem,
} from "../../common/interfaces/order/IOrderQualityCriterionLIstItem";
import { IQualityCriterionListItem } from "../../common/interfaces/quality/IQualityCriterionListItem";
import { IClinrec } from "../../common/interfaces/clinrec/IClinrec";
import { IPompResponse } from "../../common/interfaces/IPompResponse";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";

export interface IState {
  qualityRequirementsList: IPaginateItems<IOrderQualityCriterionLIstItem[]>;
  parentCriterion: ICustomSelect[];
  fullItem: IOrderQualityCriterionCurrentItem;
  queryList: IQualityCriterionListItem[];
  loading: boolean;

  loadingFullItem: boolean;
  orderClinrec: IClinrec[];
  loadingOrderClinrec: boolean;

  orderPomp: IPompResponse[];
  loadingOrderPomp: boolean;
}

export const InitialState: IState = {
  qualityRequirementsList: {} as IPaginateItems<IOrderQualityCriterionLIstItem[]>,
  parentCriterion: [] as ICustomSelect[],
  fullItem: {} as IOrderQualityCriterionCurrentItem,
  queryList: [] as IQualityCriterionListItem[],
  loading: false,
  loadingFullItem: false,

  orderClinrec: [] as IClinrec[],
  loadingOrderClinrec: false,
  orderPomp: [] as IPompResponse[],
  loadingOrderPomp: false,
};

export const proposalQualityRequirementsReducer = reducerWithInitialState(InitialState)
  .case(ProposalQualityRequirementsAction.list.started, (state) => ({
    ...state,
    qualityRequirementsList: state.qualityRequirementsList,
    loading: true,
    parentCriterion: state.parentCriterion,
  }))
  .case(ProposalQualityRequirementsAction.list.done, (state, payload) => ({
    ...state,
    qualityRequirementsList: payload.result,
    loading: false,
  }))
  .case(ProposalQualityRequirementsAction.list.failed, (state) => ({
    ...state,
    loading: false,
  }))

  .case(ProposalQualityRequirementsAction.parentCriterion.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(ProposalQualityRequirementsAction.parentCriterion.done, (state, payload) => ({
    ...state,
    loading: false,
    parentCriterion: payload.result,
  }))
  .case(ProposalQualityRequirementsAction.parentCriterion.failed, (state) => ({
    ...state,
    loading: false,
  }))
  .case(ProposalQualityRequirementsAction.fullItem.started, (state) => ({
    ...state,
    loadingFullItem: true,
    parentCriterion: state.parentCriterion,
  }))
  .case(ProposalQualityRequirementsAction.fullItem.done, (state, payload) => ({
    ...state,
    fullItem: payload.result,
    loadingFullItem: false,
  }))
  .case(ProposalQualityRequirementsAction.fullItem.failed, (state) => ({
    ...state,
    loadingFullItem: false,
  }))

  .case(ProposalQualityRequirementsAction.queryList.started, (state) => ({
    ...state,
  }))
  .case(ProposalQualityRequirementsAction.queryList.done, (state, payload) => ({
    ...state,
    queryList: payload.result,
  }))
  .case(ProposalQualityRequirementsAction.queryList.failed, (state) => ({
    ...state,
  }))
  .case(ProposalQualityRequirementsAction.clearFullItem, (state) => ({
    ...state,
    fullItem: {} as IOrderQualityCriterionCurrentItem,
  }))
  .case(ProposalQualityRequirementsAction.clinrec.started, (state) => ({
    ...state,
    loading: true,
    orderClinrec: [] as IClinrec[],
  }))
  .case(ProposalQualityRequirementsAction.clinrec.done, (state, payload) => ({
    ...state,
    orderClinrec: payload.result,
    loading: false,
  }))
  .case(ProposalQualityRequirementsAction.clinrec.failed, (state) => ({
    ...state,
    loading: false,
  }))
  .case(ProposalQualityRequirementsAction.generateClinrec.started, (state) => ({
    ...state,
    loadingOrderClinrec: true,
    orderClinrec: [] as IClinrec[],
  }))
  .case(ProposalQualityRequirementsAction.generateClinrec.done, (state, payload) => ({
    ...state,
    orderClinrec: payload.result,
    loadingOrderClinrec: false,
  }))
  .case(ProposalQualityRequirementsAction.generateClinrec.failed, (state) => ({
    ...state,
    loadingOrderClinrec: false,
  }))
  .case(ProposalQualityRequirementsAction.pomp.started, (state) => ({
    ...state,
    loading: true,
    orderPomp: [] as IPompResponse[],
  }))
  .case(ProposalQualityRequirementsAction.pomp.done, (state, payload) => ({
    ...state,
    orderPomp: payload.result,
    loading: false,
  }))
  .case(ProposalQualityRequirementsAction.pomp.failed, (state) => ({
    ...state,
    loading: false,
  }))
  .case(ProposalQualityRequirementsAction.generatePomp.started, (state) => ({
    ...state,
    loadingOrderPomp: true,
    orderPomp: [] as IPompResponse[],
  }))
  .case(ProposalQualityRequirementsAction.generatePomp.done, (state, payload) => ({
    ...state,
    orderPomp: payload.result,
    loadingOrderPomp: false,
  }))
  .case(ProposalQualityRequirementsAction.generatePomp.failed, (state) => ({
    ...state,
    loadingOrderPomp: false,
  }))
  .case(ProposalQualityRequirementsAction.sortingPompStage.started, (state) => ({
    ...state,
  }))
  .case(ProposalQualityRequirementsAction.sortingPompStage.done, (state, payload) => ({
    ...state,
    orderPomp: payload.result,
    loadingOrderPomp: false,
  }))
  .case(ProposalQualityRequirementsAction.sortingPompStage.failed, (state) => ({
    ...state,
    loadingOrderPomp: false,
  }))
  .case(ProposalQualityRequirementsAction.sortingClinrecStage.started, (state) => ({
    ...state,
  }))
  .case(ProposalQualityRequirementsAction.sortingClinrecStage.done, (state, payload) => ({
    ...state,
    orderClinrec: payload.result,
  }))
  .case(ProposalQualityRequirementsAction.sortingClinrecStage.failed, (state) => ({
    ...state,
  }))

  .build();
