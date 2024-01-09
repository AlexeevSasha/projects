import { reducerWithInitialState } from "typescript-fsa-reducers";
import { ConfigurationAction } from "./сonfigurationAction";

export interface IState {
  checkControlEventsOption: boolean;
  loading: boolean;
  userPasswordOption: boolean;
  userPasswordOptionLoading: boolean;
  contingentOption: boolean;
}

export const InitialState: IState = {
  checkControlEventsOption: false,
  loading: true,
  userPasswordOption: false,
  userPasswordOptionLoading: true,
  contingentOption: false,
};
export const configurationReducer = reducerWithInitialState(InitialState)
  .case(ConfigurationAction.getCheckControlEventsOptionAction.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(ConfigurationAction.getCheckControlEventsOptionAction.done, (state, payload) => ({
    ...state,
    checkControlEventsOption: payload.result,
    loading: false,
  }))
  .case(ConfigurationAction.getCheckControlEventsOptionAction.failed, (state) => ({
    ...state,
    checkControlEventsOption: false,
    loading: false,
  }))
  .case(ConfigurationAction.getShowUserPasswordOptionAction.started, (state) => ({
    ...state,
    userPasswordOptionLoading: true,
  }))
  .case(ConfigurationAction.getShowUserPasswordOptionAction.done, (state, payload) => ({
    ...state,
    userPasswordOption: payload.result,
    userPasswordOptionLoading: false,
  }))
  .case(ConfigurationAction.getShowUserPasswordOptionAction.failed, (state) => ({
    ...state,
    userPasswordOption: false,
    userPasswordOptionLoading: false,
  }))
  .case(ConfigurationAction.getContingentOptionAction.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(ConfigurationAction.getContingentOptionAction.done, (state, payload) => ({
    ...state,
    contingentOption: payload.result,
    loading: false,
  }))
  .case(ConfigurationAction.getContingentOptionAction.failed, (state) => ({
    ...state,
    contingentOption: false,
    loading: false,
  }))

  .build();
