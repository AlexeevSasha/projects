import { IClinrecStage } from "./IClinrecStage";
import { IConfiguratorValue } from "../IConfiguratorValue";

export interface IClinrec {
  idClinrec: number;
  idClinrecXml: number;
  clinrecName: string;
  mkb10: string[] | null;
  ageGroup: IConfiguratorValue[] | null;
  revisionId: number;
  revisionBdate: string;
  revisionEdate: string;
  stages: IClinrecStage[];
  mkb10Values?: IConfiguratorValue[] | null;
  idRubricatorMz: number | null;
  version: number | null;
  isCustom: boolean;
  status: number | null;
  usageStatus: number | null;
  clinrecUpdated: string;
}
