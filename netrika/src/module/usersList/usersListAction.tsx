import { IConfiguratorValue } from "common/interfaces/IConfiguratorValue";
import { IUser } from "common/interfaces/user/IUser";
import { IValue } from "common/interfaces/ValueDto.g";
import { actionCreator } from "../../store/action/actionCreator";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";

export class UsersListAction {
  static list = actionCreator.async<null, IPaginateItems<IUser[]>, Error>("Users/LIST_INFO");
  static user = actionCreator.async<null, IUser, Error>("Users/USER_INFO");
  static profile = actionCreator.async<null, IUser, Error>("Users/PROFILE_INFO");
  static snilsUser = actionCreator.async<null, IUser, Error>("Users/SNILS_USER_INFO");
  static clearUser = actionCreator<null>("Users/CLEAR_USER_INFO");
  static clearSnilsUser = actionCreator<null>("Users/CLEAR_USER_SNILS");
  static avalableMo = actionCreator<IConfiguratorValue[]>("Users/AVALABLE_MO");
  static userGroups = actionCreator<IValue[]>("Users/USER_GROUPS");
  static workPosition = actionCreator<IConfiguratorValue[]>("Users/WORK_POSITION");
  static roles = actionCreator<IValue[]>("Users/ROLES");
}
