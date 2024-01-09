import { reducerWithInitialState } from "typescript-fsa-reducers";
import { AuthorizationAction } from "./authorizationAction";

interface IState {
  login: string;
  userId?: number;
  isSuperExpert?: boolean;
  loading: boolean;
  iemkPortalRole?: string;
}

export const InitialState: IState = {
  login: "",
  userId: undefined,
  isSuperExpert: false,
  loading: true,
};

export const authorizationReducer = reducerWithInitialState(InitialState)
  .case(AuthorizationAction.auth, (state, payload) => ({ ...state, login: payload, loading: false }))
  .case(AuthorizationAction.userId, (state, payload) => ({ ...state, userId: payload }))
  .case(AuthorizationAction.isSuperExpert, (state, payload) => ({ ...state, isSuperExpert: payload }))
  .case(AuthorizationAction.iemkPortalRole, (state, payload) => ({ ...state, iemkPortalRole: payload }))

  .build();
