import { actionCreator } from "../../store/action/actionCreator";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IDictionaryLogItem } from "../../common/interfaces/dictionary/IDictionaryLogItem";

export class DictionaryLogAction {
  static LogList = actionCreator.async<null, IPaginateItems<IDictionaryLogItem[]>, Error>("Dictionary/Log/LIST");
}
