import { ComparisonOperatorEnum } from "../ComparisonOperatorEnum";
import { RegisterFieldTypeEnum } from "../RegisterFieldTypeEnum";

export interface IRegisterFilterFields {
  handled?: boolean;
  id: number;
  name: string;
  description: string;
  searchFields: number[];
  isExtendedKs: boolean;
  filterGroups: IRegisterFilterFieldsFilterGroup[];
}
export interface IRegisterFilterFieldsFilterGroup {
  idGroup: number;
  displayGroup: string;
  items: IRegisterFilterFieldsFilterGroupItem[];
}
export interface IRegisterFilterFieldsFilterGroupItem {
  idRfdd: number;
  fieldName: string;
  rfddType: RegisterFieldTypeEnum;
  idBizObj: number;
  idComparison: number;
  comparison: ComparisonOperatorEnum;
  hasDictionaryValues: boolean;
  values: { value: string; displayValue: string; position: number }[];
}
