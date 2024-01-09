import { RegisterFieldTypeEnum } from "./RegisterFieldTypeEnum";

export interface IDefaultRegisterFieldDictionary {
  id: number;
  bizObjId: number;
  bizObjName: string;
  name: string;
  description: string;
  type: RegisterFieldTypeEnum;
}
