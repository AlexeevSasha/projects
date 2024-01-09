import { IConfiguratorValue } from "common/interfaces/IConfiguratorValue";
import { IUser } from "common/interfaces/user/IUser";
import { IValue } from "common/interfaces/ValueDto.g";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { UsersListAction } from "./usersListAction";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";

export interface IState {
  list: IPaginateItems<IUser[]>;
  user: IUser;
  snilsUser: IUser;
  loading: boolean;
  avalableMo: IConfiguratorValue[];
  userGroups: IValue[];
  workPosition: IConfiguratorValue[];
  roles: IValue[];
  profile: IUser;
}

export const InitialState: IState = {
  list: {} as IPaginateItems<IUser[]>,
  user: {} as IUser,
  snilsUser: {} as IUser,
  loading: false,
  avalableMo: [],
  userGroups: [],
  workPosition: [],
  roles: [],
  profile: {} as IUser,
};

export const usersListReducer = reducerWithInitialState(InitialState)
  .case(UsersListAction.list.started, (state) => ({
    ...state,
    list: state.list,
    loading: true,
  }))
  .case(UsersListAction.list.done, (state, payload) => ({
    ...state,
    list: payload.result,
    loading: false,
  }))
  .case(UsersListAction.list.failed, (state) => ({
    ...state,
    list: state.list,
    loading: false,
  }))

  .case(UsersListAction.user.started, (state) => ({
    ...state,
    user: state.user,
    loading: true,
  }))
  .case(UsersListAction.user.done, (state, payload) => ({
    ...state,
    user: payload.result,
    loading: false,
  }))
  .case(UsersListAction.user.failed, (state) => ({
    ...state,
    user: state.user,
    loading: false,
  }))

  .case(UsersListAction.snilsUser.started, (state) => ({
    ...state,
    snilsUser: state.snilsUser,
    loading: true,
  }))
  .case(UsersListAction.snilsUser.done, (state, payload) => ({
    ...state,
    snilsUser: payload.result,
    loading: false,
  }))
  .case(UsersListAction.snilsUser.failed, (state, error) => ({
    ...state,
    snilsUser: { familyName: error.error.message } as IUser,
    user: {} as IUser,
    loading: false,
  }))

  .case(UsersListAction.clearUser, (state) => ({
    ...state,
    user: {} as IUser,
    snilsUser: {} as IUser,
  }))

  .case(UsersListAction.avalableMo, (state, payload) => ({
    ...state,
    avalableMo: payload,
  }))

  .case(UsersListAction.userGroups, (state, payload) => ({
    ...state,
    userGroups: payload,
  }))

  .case(UsersListAction.workPosition, (state, payload) => ({
    ...state,
    workPosition: payload,
  }))

  .case(UsersListAction.roles, (state, payload) => ({
    ...state,
    roles: payload,
  }))

  .case(UsersListAction.profile.started, (state) => ({
    ...state,
    profile: state.profile,
    loading: true,
  }))
  .case(UsersListAction.profile.done, (state, payload) => ({
    ...state,
    profile: payload.result,
    loading: false,
  }))
  .case(UsersListAction.profile.failed, (state) => ({
    ...state,
    profile: state.profile,
    loading: false,
  }))

  .case(UsersListAction.clearSnilsUser, (state) => ({
    ...state,
    snilsUser: { familyName: "Необходимо проверить ФРМР" } as IUser,
    user: {} as IUser,
    loading: false,
  }))
  .build();
