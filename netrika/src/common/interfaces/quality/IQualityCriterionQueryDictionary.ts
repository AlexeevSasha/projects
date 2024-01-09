import { IBaseDictionary } from "../dictionary/IBaseDictionary";
import { IQualityParams } from "./IQualityParams";

export interface IQualityCriterionQueryDictionary extends IBaseDictionary {
  query: string;
  params: IQualityParams[];
}
