import { actionCreator } from "../../store/action/actionCreator";
import { ICustomSelect } from "../../common/interfaces/ISelect";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IDefaultRegisterFieldDictionary } from "../../common/interfaces/IDefaultRegisterFieldDictionary";

export class DictionaryFieldDefaultAction {
  static dictionaryFieldDefault = actionCreator.async<null, IPaginateItems<IDefaultRegisterFieldDictionary[]>, Error>(
    "Dictionary/FieldDefault"
  );
  static listFields = actionCreator.async<null, string[], Error>("Dictionary/ListFieldDefault");
  static listBizObj = actionCreator.async<null, ICustomSelect[], Error>("Dictionary/ListFieldDefaultBizObj");
}
