import { RegisterFieldTypeEnum } from "./RegisterFieldTypeEnum";

export interface IObservationJsonFields {
  query: string;
  parentId: null;
  jsonType: string;
  fieldName: string;
  observationCode: number;
  id: number;
  description: string;
  type: RegisterFieldTypeEnum;
  hasDictionaryValues: boolean;
  valuesDictionary?: string;
}
