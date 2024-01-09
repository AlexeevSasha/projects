import { ComparisonOperatorEnum } from "./ComparisonOperatorEnum";
import { ComparisonValueTypeEnum } from "./ComparisonValueTypeEnum.g";
import { RegisterFieldTypeEnum } from "./RegisterFieldTypeEnum";

export interface IFilterComparisonOperator {
  operator: ComparisonOperatorEnum;
  display: string;
  availableTypes: RegisterFieldTypeEnum[];
  comparisonValueType: ComparisonValueTypeEnum;
  useDictionaryValues: boolean;
}
