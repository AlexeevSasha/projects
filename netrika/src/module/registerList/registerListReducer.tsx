import { reducerWithInitialState } from "typescript-fsa-reducers";
import { RegisterListAction } from "./registerListAction";
import { IRegisterGroupListItem } from "../../common/interfaces/register/IRegisterGroupListItem";

export interface IState {
  list: IRegisterGroupListItem[];
  loading: boolean;
}

export const InitialState: IState = {
  list: [] as IRegisterGroupListItem[],
  loading: false,
};

export const registerListReducer = reducerWithInitialState(InitialState)
  .case(RegisterListAction.list.started, (state) => ({
    list: state.list,
    loading: true,
  }))
  .case(RegisterListAction.list.done, (state, payload) => ({
    list: payload.result,
    loading: false,
  }))
  .case(RegisterListAction.list.failed, (state) => ({
    list: state.list,
    loading: false,
  }))

  .build();
