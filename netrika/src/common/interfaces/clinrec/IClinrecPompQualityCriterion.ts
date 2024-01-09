import { IQualityParams } from "../quality/IQualityParams";
import { CriterionExecuteResultEnum } from "../CriterionExecuteResultEnum";
import { IQualityPompParamsValue } from "../quality/IQualityPompParamsValue";

export interface IClinrecPompQualityCriterion {
  id: number;
  name: string;
  description: string;
  updatedAt: Date | string;
  idQuery: number;
  nameQuery: string;
  params: IQualityParams[];
  qualityParamsValue: IQualityPompParamsValue[];
  status?: CriterionExecuteResultEnum | null;
}
