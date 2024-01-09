import { actionCreator } from "../../store/action/actionCreator";

export class AuthorizationAction {
  static auth = actionCreator<string>("Register/LOGIN");
  static userId = actionCreator<number>("Register/USER_ID");
  static isSuperExpert = actionCreator<boolean>("Register/IS_SUPER_EXPERT");
  static iemkPortalRole = actionCreator<string>("Register/iemkPortalRole");
}
