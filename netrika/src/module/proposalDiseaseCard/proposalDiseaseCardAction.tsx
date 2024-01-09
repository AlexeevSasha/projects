import { actionCreator } from "../../store/action/actionCreator";
import { IOrderConfInfo } from "../../common/interfaces/order/IOrderConfInfo";
import { ICustomSelect } from "../../common/interfaces/ISelect";

export class ProposalDiseaseCardAction {
  static list = actionCreator.async<null, IOrderConfInfo, Error>("Register/ProposalDiseaseCard_INFO");
  static listAttribute = actionCreator.async<any, ICustomSelect[], Error>("Register/ProposalDiseaseCard_LIST_TYPE");
  static updateList = actionCreator.async<null, IOrderConfInfo, Error>("Register/ProposalDiseaseCard_UPDATE");
  static loadingPopup = actionCreator.async<null, boolean, Error>("Register/LOADING_POPUP");
  static showBtnAddCustomBlock = actionCreator<boolean>("Register/showBtnAddCustomBlock");
  static setIdNewBlock = actionCreator<number | undefined>("Register/setIdNewBlock");
  static setIdNewGroup = actionCreator<number | undefined>("Register/setIdNewGroup");
  static setIdNewSubGroup = actionCreator<number | undefined>("Register/setIdNewSubGroup");
  static setIdNewAttribute = actionCreator<number | undefined>("Register/setIdNewAttribute");
}
