import { reducerWithInitialState } from "typescript-fsa-reducers";
import { ProposalDiseaseCardAction } from "./proposalDiseaseCardAction";
import { ICustomSelect } from "../../common/interfaces/ISelect";
import { IOrderConfInfo } from "../../common/interfaces/order/IOrderConfInfo";

export interface IState {
  data: IOrderConfInfo;
  loading: boolean;
  listAttribute: ICustomSelect[];
  listSecondAtribute: ICustomSelect[];
  loadingAttribute: boolean;
  loadingPopup?: boolean;
  showBtnAddCustomBlock?: boolean;
  idNewBlock?: number;
  idNewSubGroup?: number;
  idNewGroup?: number;
  idNewAttribute?: number;
}

export const InitialState: IState = {
  data: {} as IOrderConfInfo,
  loading: true,
  listAttribute: [],
  listSecondAtribute: [],
  loadingAttribute: true,
};

export const proposalDiseaseCardReducer = reducerWithInitialState(InitialState)
  .case(ProposalDiseaseCardAction.list.started, (state) => ({ ...state, loading: true }))
  .case(ProposalDiseaseCardAction.list.failed, (state) => ({ ...state, loading: false }))
  .case(ProposalDiseaseCardAction.list.done, (state, { result }) => ({
    ...state,
    data: result,
    loading: false,
  }))

  .case(ProposalDiseaseCardAction.listAttribute.started, (state, payload) => ({
    ...state,
    listAttribute: !payload ? [] : state.listAttribute,
    listSecondAtribute: [],
    loadingAttribute: true,
  }))
  .case(ProposalDiseaseCardAction.listAttribute.done, (state, { params, result }) => ({
    ...state,
    listAttribute: params ? state.listAttribute : result,
    listSecondAtribute: params ? result : ([] as ICustomSelect[]),
    loadingAttribute: false,
  }))
  .case(ProposalDiseaseCardAction.listAttribute.failed, (state) => ({
    ...state,
    loadingAttribute: false,
  }))

  .case(ProposalDiseaseCardAction.updateList.started, (state) => ({
    ...state,
    listAttribute: [],
  }))
  .case(ProposalDiseaseCardAction.updateList.failed, (state) => ({ ...state }))
  .case(ProposalDiseaseCardAction.updateList.done, (state, { result }) => ({
    ...state,
    data: result,
  }))

  .case(ProposalDiseaseCardAction.loadingPopup.started, (state) => ({
    ...state,
    listAttribute: [],
    loadingPopup: true,
  }))
  .case(ProposalDiseaseCardAction.loadingPopup.failed, (state) => ({
    ...state,
    loadingPopup: false,
  }))
  .case(ProposalDiseaseCardAction.loadingPopup.done, (state) => ({
    ...state,
    loadingPopup: false,
  }))

  .case(ProposalDiseaseCardAction.showBtnAddCustomBlock, (state, payload) => ({
    ...state,
    showBtnAddCustomBlock: payload,
  }))

  .case(ProposalDiseaseCardAction.setIdNewBlock, (state, payload) => ({
    ...state,
    idNewBlock: payload,
  }))
  .case(ProposalDiseaseCardAction.setIdNewSubGroup, (state, payload) => ({
    ...state,
    idNewSubGroup: payload,
  }))
  .case(ProposalDiseaseCardAction.setIdNewGroup, (state, payload) => ({
    ...state,
    idNewGroup: payload,
  }))
  .case(ProposalDiseaseCardAction.setIdNewAttribute, (state, payload) => ({
    ...state,
    idNewAttribute: payload,
  }))

  .build();
