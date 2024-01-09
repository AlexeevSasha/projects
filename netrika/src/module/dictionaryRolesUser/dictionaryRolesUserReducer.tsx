import { reducerWithInitialState } from "typescript-fsa-reducers";
import { DictionaryRolesUserAction } from "./dictionaryRolesUserAction";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IDictionaryUserRole } from "../../common/interfaces/dictionary/IDictionaryUserRole";

export interface IState {
  data: IPaginateItems<IDictionaryUserRole[]>;
  loading: boolean;
}

export const InitialState: IState = {
  data: {} as IPaginateItems<IDictionaryUserRole[]>,
  loading: true,
};

export const dictionaryRolesUserReducer = reducerWithInitialState(InitialState)
  .case(DictionaryRolesUserAction.rolesList.started, (state) => ({
    data: state.data,
    loading: true,
  }))
  .case(DictionaryRolesUserAction.rolesList.done, (state, payload) => ({
    data: payload.result,
    loading: false,
  }))
  .case(DictionaryRolesUserAction.rolesList.failed, (state) => ({
    data: state.data,
    loading: false,
  }))

  .build();
