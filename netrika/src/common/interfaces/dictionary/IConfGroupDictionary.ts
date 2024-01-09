import { IBaseDictionary } from "./IBaseDictionary";

export interface IConfGroupDictionary extends IBaseDictionary {
  confBlockId: number;
  confBlockName: string;
  isDefault: boolean;
  nsiDictionarySubGroup: string;
  nsiDictionaryAttribute: string;
}
