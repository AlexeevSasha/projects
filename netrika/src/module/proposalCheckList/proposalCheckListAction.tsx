import { actionCreator } from "../../store/action/actionCreator";
import { IOrderControlList } from "../../common/interfaces/order/IOrderControlList";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IOrderControlListItem } from "../../common/interfaces/order/IOrderControlListItem";

export class ProposalCheckListAction {
  static list = actionCreator.async<null, IPaginateItems<IOrderControlListItem[]>, Error>(
    "Proposal/ProposalCheckList_INFO"
  );
  static infoSettings = actionCreator.async<void, IOrderControlList, Error>("Proposal/ProposalCheckList_INFO_SETTINGS");
  static createCheckList = actionCreator.async<null, any, Error>("Proposal/createCheckList");
  static updateCheckList = actionCreator.async<null, any, Error>("Proposal/updateCheckList");
  static updateName = actionCreator<string>("Proposal/updateName");
  static updateDescription = actionCreator<string>("Proposal/updateDescription");
  static updateDisabledSave = actionCreator<boolean>("Proposal/updateDisabledSave");
  static clearSettings = actionCreator<boolean>("Proposal/clearSettings");
}
