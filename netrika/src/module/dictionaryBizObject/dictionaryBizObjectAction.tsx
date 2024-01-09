import { actionCreator } from "../../store/action/actionCreator";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IRegisterBizObjDictionary } from "../../common/interfaces/register/IRegisterBizObjDictionary";

export class DictionaryBizObjectAction {
  static dictionaryBizObject = actionCreator.async<null, IPaginateItems<IRegisterBizObjDictionary[]>, Error>(
    "Dictionary/BizObject"
  );
}
