import { IQualityParams } from "../quality/IQualityParams";
import { IQualityParamsValue } from "../quality/IQualityParamsValue";

export interface IOrderQualityCriterionLIstItem {
  id: number;
  name: string;
  description: string;
  updatedAt: Date | string;
}

export interface IOrderQualityCriterionCurrentItem {
  id: number;
  name: string;
  description: string;
  createdAt?: Date | string;
  updatedAt: Date | string;
  idQuery: number | null;
  nameQuery: string;
  params: IQualityParams[];
  qualityParamsValue: IQualityParamsValue[];
  parentId?: number;
  orderId: number;
}
