import { IOrderQualityCriterionBase } from "./IOrderQualityCriterionBase";
import { IQualityParams } from "../quality/IQualityParams";
import { IQualityParamsValue } from "../quality/IQualityParamsValue";

export interface IOrderQualityCriterion extends IOrderQualityCriterionBase {
  description: string;
  orderId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  idQuery: number | null;
  queryName: string;
  parentId: number;
  params: IQualityParams[];
  qualityParamsValue: IQualityParamsValue[];
}
