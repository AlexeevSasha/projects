import { IQualityParams } from "./IQualityParams";

export interface IQualityCriterionListItem {
  id: number;
  name: string;
  params: IQualityParams[];
}
