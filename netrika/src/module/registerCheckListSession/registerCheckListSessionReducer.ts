import { reducerWithInitialState } from "typescript-fsa-reducers";
import { RegisterCheckListSessionAction } from "./registerCheckListSessionAction";

interface IState {
  sessionIdList: { id: number; jobId: string }[];
  sessionToken: string;
}

export const InitialState: IState = {
  sessionIdList: [],
  sessionToken: "",
};

export const registerCheckListSessionReducer = reducerWithInitialState(InitialState)
  .case(RegisterCheckListSessionAction.setIdToSession, (state, payload) => ({
    ...state,
    sessionIdList: [...state.sessionIdList, payload],
  }))

  .case(RegisterCheckListSessionAction.deleteIdToSession, (state, payload) => ({
    ...state,
    sessionIdList: [...state.sessionIdList.filter((sessionId) => !payload.find((item) => item === sessionId.id))],
  }))

  .case(RegisterCheckListSessionAction.setSessionToken, (state, payload) => ({
    ...state,
    sessionToken: payload,
  }))

  .build();
