import { RegisterFieldTypeEnum } from "../RegisterFieldTypeEnum";

export interface IRegisterFieldBase {
  id: number;
  description: string;
  type: RegisterFieldTypeEnum;
  hasDictionaryValues: boolean;
}
