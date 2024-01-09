import { reducerWithInitialState } from "typescript-fsa-reducers";
import { ProposalListAction } from "./proposalListAction";
import { IRegisterGroup } from "../../common/interfaces/register/IRegisterGroup";
import { IOrderGroup } from "../../common/interfaces/order/IOrderGroup";

export interface IState {
  list: IOrderGroup[];
  loading: boolean;
  registerGroup: IRegisterGroup[];
}

export const InitialState: IState = {
  list: [] as IOrderGroup[],
  loading: true,
  registerGroup: [],
};

export const proposalListReducer = reducerWithInitialState(InitialState)
  .case(ProposalListAction.list.started, (state) => ({
    list: state.list,
    loading: true,
    registerGroup: state.registerGroup,
  }))
  .case(ProposalListAction.list.done, (state, payload) => ({
    list: payload.result,
    loading: false,
    registerGroup: state.registerGroup,
  }))
  .case(ProposalListAction.list.failed, (state) => ({
    list: state.list,
    loading: false,
    registerGroup: state.registerGroup,
  }))

  .case(ProposalListAction.registerGroup.started, (state) => ({
    list: state.list,
    loading: state.loading,
    registerGroup: state.registerGroup,
  }))
  .case(ProposalListAction.registerGroup.done, (state, payload) => ({
    list: state.list,
    loading: state.loading,
    registerGroup: payload.result,
  }))
  .case(ProposalListAction.registerGroup.failed, (state) => ({
    list: state.list,
    loading: state.loading,
    registerGroup: state.registerGroup,
  }))

  .build();
