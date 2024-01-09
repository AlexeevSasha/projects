import { actionCreator } from "../../store/action/actionCreator";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IConfGroupDictionary } from "../../common/interfaces/dictionary/IConfGroupDictionary";

export class DictionaryConfGroupAction {
  static dictionaryConfGroup = actionCreator.async<null, IPaginateItems<IConfGroupDictionary[]>, Error>(
    "Dictionary/ConfGroup"
  );
}
