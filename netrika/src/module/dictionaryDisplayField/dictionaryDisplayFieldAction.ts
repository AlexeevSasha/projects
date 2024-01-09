import { actionCreator } from "../../store/action/actionCreator";
import { IDisplayFieldItem, IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IDictionaryDisplayTableField } from "../../common/interfaces/dictionary/IDictionaryDisplayTableField";
import { IConfiguratorValue } from "../../common/interfaces/IConfiguratorValue";

export class DictionaryDisplayFieldAction {
  static displayFieldList = actionCreator.async<null, IPaginateItems<IDisplayFieldItem[]>, Error>(
    "Dictionary/DISPLAY_FIELD/LIST"
  );
  static bizObjectsList = actionCreator.async<null, { id: number; name: string }[], Error>(
    "Dictionary/BIZ_OBJECTS/LIST"
  );
  static attributesList = actionCreator.async<null, { id: number; name: string; description: string }[], Error>(
    "Dictionary/ATTRIBUTES/LIST"
  );

  static dictionariesList = actionCreator.async<null, IConfiguratorValue[], Error>("Dictionary/DICTIONARIES/LIST");
  static tableFields = actionCreator.async<null, IDictionaryDisplayTableField[], Error>("Dictionary/TABLE_FIELDS/LIST");
  static clearLists = actionCreator.async<
    { isDictionariesList: boolean; isTableFieldList: boolean; isAttributesList: boolean },
    any,
    Error
  >("Dictionary/DISPLAY_FIELD/CLEAT_LIST");
}
