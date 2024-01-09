import { reducerWithInitialState } from "typescript-fsa-reducers";
import { ProposalContingentAction } from "./proposalContingentAction";
import { ICustomSelect } from "../../common/interfaces/ISelect";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IOrderContingentListItem } from "../../common/interfaces/order/IOrderContingentListItem";
import { IScriptParam } from "../../common/interfaces/order/IOrderContingent";

export interface IState {
  contingentList: IPaginateItems<IOrderContingentListItem[]>;
  loading: boolean;
  type: ICustomSelect[];
  iamScriptsParams: IScriptParam[] | null;
  loadingIamScriptsParams: boolean;
}

export const InitialState: IState = {
  contingentList: {} as IPaginateItems<IOrderContingentListItem[]>,
  loading: false,
  type: [],
  iamScriptsParams: [],
  loadingIamScriptsParams: false,
};

export const proposalContingentReducer = reducerWithInitialState(InitialState)
  .case(ProposalContingentAction.list.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(ProposalContingentAction.list.done, (state, payload) => ({
    ...state,
    contingentList: payload.result,
    loading: false,
  }))
  .case(ProposalContingentAction.list.failed, (state) => ({
    ...state,
    loading: false,
  }))
  .case(ProposalContingentAction.iamScriptsParams.started, (state) => ({ ...state, loadingIamScriptsParams: true }))
  .case(ProposalContingentAction.iamScriptsParams.done, (state, payload) => ({
    ...state,
    iamScriptsParams: payload.result,
    loadingIamScriptsParams: false,
  }))
  .case(ProposalContingentAction.iamScriptsParams.failed, (state) => ({
    ...state,
    loadingIamScriptsParams: false,
  }))
  .case(ProposalContingentAction.listType.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(ProposalContingentAction.listType.done, (state, payload) => ({
    ...state,
    loading: false,
    type: payload.result.map((item) => {
      return { value: item.id.toString(), label: item.name };
    }),
  }))
  .case(ProposalContingentAction.listType.failed, (state) => ({
    ...state,
    loading: false,
  }))

  .build();
