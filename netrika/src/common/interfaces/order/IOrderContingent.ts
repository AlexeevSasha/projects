import { FieldTypeEnum } from "../FieldTypeEnum";

export interface IOrderContingent {
  id: number;
  name: string;
  orderId?: number;
  description: string;
  link: string;
  elementTypeId: number;
  elementType?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  scriptId: number;
  scriptName?: string;
  scriptParams?: IScriptParam[] | null;
}

export interface IScriptParam {
  paramId: number;
  value: string;
  displayValue?: string;
  type: FieldTypeEnum;
  nsiUid: string | null;
  description?: string;
  exampleValue?: string;
}
