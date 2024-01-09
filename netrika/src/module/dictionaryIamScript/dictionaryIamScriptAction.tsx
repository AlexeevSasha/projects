import { actionCreator } from "../../store/action/actionCreator";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IamScriptDto } from "../../common/interfaces/IamScriptDto";
import { IConfiguratorValue } from "../../common/interfaces/IConfiguratorValue";

export class DictionaryIamScriptAction {
  static iamScriptList = actionCreator.async<null, IPaginateItems<IamScriptDto[]>, Error>("Dictionary/IamScript/LIST");
  static paramTypes = actionCreator.async<null, IConfiguratorValue[], Error>("Dictionary/IamScript/paramTypes");
  static loadCountParams = actionCreator.async<null, any, Error>("Dictionary/IamScript/loadCountParams");
  static updateScriptList = actionCreator.async<null, any, Error>("Dictionary/IamScript/updateScriptList");
}
