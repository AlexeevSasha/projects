import { reducerWithInitialState } from "typescript-fsa-reducers";
import { RegisterContingentAction } from "./registerContingentAction";

export interface IState {
  newList: [{ authUrl: string }];
  list: string[];
  loading: boolean;
}

export const InitialState: IState = {
  newList: [{ authUrl: "" }],
  list: [],
  loading: true,
};

export const registerContingentReducer = reducerWithInitialState(InitialState)
  .case(RegisterContingentAction.newList.started, (state) => ({
    ...state,
    newList: [{ authUrl: "" }],
    loading: true,
  }))
  .case(RegisterContingentAction.newList.done, (state, payload) => ({
    ...state,
    newList: payload.result,
    loading: false,
  }))
  .case(RegisterContingentAction.newList.failed, (state) => ({
    ...state,
    newList: state.newList,
    loading: false,
  }))
  .case(RegisterContingentAction.list.started, (state) => ({
    ...state,
    list: [],
    loading: true,
  }))
  .case(RegisterContingentAction.list.done, (state, payload) => ({
    ...state,
    list: payload.result,
    loading: false,
  }))
  .case(RegisterContingentAction.list.failed, (state) => ({
    ...state,
    list: state.list,
    loading: false,
  }))

  .build();
