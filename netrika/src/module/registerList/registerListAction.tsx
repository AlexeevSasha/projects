import { actionCreator } from "../../store/action/actionCreator";
import { IRegisterGroupListItem } from "../../common/interfaces/register/IRegisterGroupListItem";

export class RegisterListAction {
  static list = actionCreator.async<null, IRegisterGroupListItem[], Error>("Register/LIST_INFO");
}
