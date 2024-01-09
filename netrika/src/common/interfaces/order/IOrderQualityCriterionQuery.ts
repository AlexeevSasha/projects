import { IQualityParamsValue } from "../quality/IQualityParamsValue";

export interface IOrderQualityCriterionQuery {
  id: number;
  idQuery: number | null;
  qualityParamsValue: IQualityParamsValue[];
}
