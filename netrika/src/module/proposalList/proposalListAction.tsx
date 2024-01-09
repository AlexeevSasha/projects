import { actionCreator } from "../../store/action/actionCreator";
import { IRegisterGroup } from "../../common/interfaces/register/IRegisterGroup";
import { IOrderGroup } from "../../common/interfaces/order/IOrderGroup";

export class ProposalListAction {
  static list = actionCreator.async<null, IOrderGroup[], Error>("Register/ProposalList_LIST");

  static registerGroup = actionCreator.async<null, IRegisterGroup[], Error>("Register/ProposalRegisterGroup_LIST");
}
