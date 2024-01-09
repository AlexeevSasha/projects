import { actionCreator } from "../../store/action/actionCreator";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IBaseDictionary } from "../../common/interfaces/dictionary/IBaseDictionary";

export class DictionaryGroupsUserAction {
  static groupsList = actionCreator.async<null, IPaginateItems<IBaseDictionary[]>, Error>("Dictionary/GROUP_USER/LIST");
}
