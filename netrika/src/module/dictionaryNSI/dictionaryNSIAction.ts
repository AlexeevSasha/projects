import { INsiDictionary } from "common/interfaces/INsiDictionary";
import { actionCreator } from "../../store/action/actionCreator";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";

export class DictionaryNSIAction {
  static dictionaryNSIList = actionCreator.async<null, IPaginateItems<INsiDictionary[]>, Error>("Dictionary/NSI");

  static infoControlListResult = actionCreator.async<null, { Total: 0; items: []; itemsNames: [] }, Error>(
    "Dictionary/NSI_INFO_Result"
  );

  static updateActiveList = actionCreator<string>("Dictionary/NSI_ControlList_updateActiveList");
  static updateLastLoadList = actionCreator<string | undefined>("Dictionary/NSI_ControlList_updateLastLoadList");

  static setIdToSession = actionCreator<{ id: string; jobId: string }>("Dictionary/NSI_FAKE_SESSION/SET_ID");
  static deleteIdToSession = actionCreator<string[]>("Dictionary/NSI_FAKE_SESSION/DELETE_ID");
  static setSessionToken = actionCreator<string>("Dictionary/NSI_FAKE_SESSION/SET_SESSION_TOKEN");
}
