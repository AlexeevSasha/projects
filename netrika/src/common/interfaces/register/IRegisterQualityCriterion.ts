import { IQualityParams } from "../quality/IQualityParams";
import { IQualityParamsValue } from "../quality/IQualityParamsValue";

export interface IRegisterQualityCriterion {
  id: number;
  idControlList: number;
  idQuery: number;
  name: string;
  queryResult: number;
  params: IQualityParams[];
  qualityParamsValue: IQualityParamsValue[];
}
