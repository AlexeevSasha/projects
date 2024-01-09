import { actionCreator } from "../../store/action/actionCreator";
import { INamed } from "../../common/interfaces/INamed";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IOrderContingentListItem } from "../../common/interfaces/order/IOrderContingentListItem";
import { IScriptParam } from "../../common/interfaces/order/IOrderContingent";

export class ProposalContingentAction {
  static list = actionCreator.async<null, IPaginateItems<IOrderContingentListItem[]>, Error>(
    "Register/ProposalContingent_INFO"
  );
  static iamScriptsParams = actionCreator.async<null, IScriptParam[] | null, Error>(
    "Register/ProposalContingent_iamScriptsParams"
  );
  static listType = actionCreator.async<null, INamed[], Error>("Register/ProposalContingent_LIST_TYPE");
}
