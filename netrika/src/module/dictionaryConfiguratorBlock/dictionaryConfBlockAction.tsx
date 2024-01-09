import { actionCreator } from "../../store/action/actionCreator";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IConfBlockDictionary } from "../../common/interfaces/dictionary/IConfBlockDictionary";

export class DictionaryConfBlockAction {
  static dictionaryConfBlock = actionCreator.async<null, IPaginateItems<IConfBlockDictionary[]>, Error>(
    "Dictionary/ConfBlock"
  );
}
