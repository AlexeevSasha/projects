import { ComparisonValueTypeEnum } from "./ComparisonValueTypeEnum.g";

export interface ISelect {
  key: string | number;
  value: string | number;
}
export interface ICustomSelect extends ICustomBaseSelect {
  hasDictionaryValues?: boolean;
  type?: ComparisonValueTypeEnum;
  useDictionaryValues?: boolean;
}
export interface ICustomBaseSelect {
  label: string;
  value: string | number;
  name?: string;
}
