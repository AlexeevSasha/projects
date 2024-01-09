import { actionCreator } from "../../store/action/actionCreator";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IBaseDictionary } from "../../common/interfaces/dictionary/IBaseDictionary";

export class DictionaryRegisterGroupAction {
  static dictionaryRegisterGroup = actionCreator.async<null, IPaginateItems<IBaseDictionary[]>, Error>(
    "Dictionary/REGISTER_GROUP"
  );
}
