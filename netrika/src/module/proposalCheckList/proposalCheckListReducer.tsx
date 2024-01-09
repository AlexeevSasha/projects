import { reducerWithInitialState } from "typescript-fsa-reducers";
import { ProposalCheckListAction } from "./proposalCheckListAction";
import { IOrderControlList } from "../../common/interfaces/order/IOrderControlList";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IOrderControlListItem } from "../../common/interfaces/order/IOrderControlListItem";

export interface IState {
  controlCheckList: IPaginateItems<IOrderControlListItem[]>;
  loading: boolean;
  setting: IOrderControlList;
  disabledSave?: boolean;
}

export const InitialState: IState = {
  controlCheckList: {} as IPaginateItems<IOrderControlListItem[]>,
  setting: {} as IOrderControlList,
  loading: false,
};

export const proposalCheckListReducer = reducerWithInitialState(InitialState)
  .case(ProposalCheckListAction.list.started, (state) => ({
    ...state,
    controlCheckList: state.controlCheckList,
    loading: true,
  }))
  .case(ProposalCheckListAction.list.done, (state, payload) => ({
    ...state,
    controlCheckList: payload.result,
    loading: false,
  }))
  .case(ProposalCheckListAction.list.failed, (state) => ({
    ...state,
    controlCheckList: state.controlCheckList,
    loading: false,
  }))
  .case(ProposalCheckListAction.infoSettings.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(ProposalCheckListAction.infoSettings.done, (state, { result }) => ({
    ...state,
    setting: result,
    loading: false,
    testCheckList: undefined,
    errors: { sql: false },
  }))
  .case(ProposalCheckListAction.infoSettings.failed, (state) => ({
    ...state,
    loading: false,
  }))
  .case(ProposalCheckListAction.updateName, (state, payload) => ({
    ...state,
    setting: { ...state.setting, name: payload },
  }))

  .case(ProposalCheckListAction.updateDescription, (state, payload) => ({
    ...state,
    setting: { ...state.setting, description: payload },
  }))
  .case(ProposalCheckListAction.createCheckList.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(ProposalCheckListAction.createCheckList.done, (state) => ({
    ...state,
    loading: false,
  }))
  .case(ProposalCheckListAction.createCheckList.failed, (state) => ({
    ...state,
    loading: false,
  }))
  .case(ProposalCheckListAction.updateCheckList.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(ProposalCheckListAction.updateCheckList.done, (state) => ({
    ...state,
    loading: false,
  }))
  .case(ProposalCheckListAction.updateCheckList.failed, (state) => ({
    ...state,
    loading: false,
  }))
  .case(ProposalCheckListAction.updateDisabledSave, (state, payload) => ({
    ...state,
    disabledSave: payload,
  }))
  .case(ProposalCheckListAction.clearSettings, (state) => ({
    ...state,
    setting: {} as IOrderControlList,
    loading: false,
  }))

  .build();
