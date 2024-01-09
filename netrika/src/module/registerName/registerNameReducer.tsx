import { reducerWithInitialState } from "typescript-fsa-reducers";
import { RegisterNameAction } from "./registerNameAction";

export interface IState {
  registerName: string;
}

export const InitialState: IState = {
  registerName: "",
};

export const registerNameReducer = reducerWithInitialState(InitialState)
  .case(RegisterNameAction.registerName.started, (state) => ({
    registerName: state.registerName,
  }))
  .case(RegisterNameAction.registerName.done, (state, payload) => ({
    registerName: payload.result,
  }))
  .case(RegisterNameAction.registerName.failed, (state) => ({
    registerName: "Ошибка",
  }))

  .build();
