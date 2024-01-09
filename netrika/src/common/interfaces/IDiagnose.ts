import { IDeathInfo } from "./IDeathInfo";
import { IDiagnoseBase } from "./IDiagnoseBase";

export interface IDiagnose {
  diagnoses: { diagnosisDate: Date; diagnoses: IDiagnoseBase[] }[];
  deathInfo: IDeathInfo;
}
