import { IQualityParams } from "../quality/IQualityParams";

export interface IOrderQualityCriterionBase {
  id: number;
  name: string;
  params: IQualityParams[];
}
