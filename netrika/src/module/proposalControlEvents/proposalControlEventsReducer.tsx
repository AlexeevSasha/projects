import { reducerWithInitialState } from "typescript-fsa-reducers";
import { ProposalControlEventsAction } from "./proposalControlEventsAction";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IOrderControlEventListItem } from "../../common/interfaces/order/IOrderControlEventListItem";

export interface IState {
  controlEventsList: IPaginateItems<IOrderControlEventListItem[]>;
  loading: boolean;
}

export const InitialState: IState = {
  controlEventsList: {} as IPaginateItems<IOrderControlEventListItem[]>,
  loading: true,
};

export const proposalControlEventsReducer = reducerWithInitialState(InitialState)
  .case(ProposalControlEventsAction.list.started, (state) => ({
    controlEventsList: state.controlEventsList,
    loading: true,
  }))
  .case(ProposalControlEventsAction.list.done, (state, payload) => ({
    controlEventsList: payload.result,
    loading: false,
  }))
  .case(ProposalControlEventsAction.list.failed, (state) => ({
    controlEventsList: state.controlEventsList,
    loading: false,
  }))

  .build();
