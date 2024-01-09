import { ComparisonOperatorEnum } from "./ComparisonOperatorEnum";
import { ConditionOperatorEnum } from "./ConditionOperatorEnum";

export interface IFilter {
  fieldId: number;
  fieldBizObjId: number;
  id: number;
  value: string;
  values: { position: number; value: string; displayValue?: string }[];
  comparison: ComparisonOperatorEnum;
  condition?: ConditionOperatorEnum;
  position: number;
  parentId: number;
  filterLevel: number;
  jsonQuery?: string;
  jsonRuleId?: number;
  jsonParentId?: number | null;
  comparisonValue?: ComparisonOperatorEnum;
}
