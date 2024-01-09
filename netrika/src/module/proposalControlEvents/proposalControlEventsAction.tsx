import { actionCreator } from "../../store/action/actionCreator";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IOrderControlEventListItem } from "../../common/interfaces/order/IOrderControlEventListItem";

export class ProposalControlEventsAction {
  static list = actionCreator.async<null, IPaginateItems<IOrderControlEventListItem[]>, Error>(
    "Register/ProposalControlEvents_INFO"
  );
}
