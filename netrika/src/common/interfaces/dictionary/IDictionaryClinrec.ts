import { IClinrecThesis } from "../clinrec/IClinrecThesis";
import { IClinrecQualityCriterion } from "../clinrec/IClinrecQualityCriterion";
import { IClinrec } from "../clinrec/IClinrec";
import { IClinrecStage } from "../clinrec/IClinrecStage";
import { IDictionaryPompActivity } from "./IDictionaryPomp";
import { IConfiguratorValue } from "../IConfiguratorValue";

export interface IDictionaryClinrecActivity extends IClinrecQualityCriterion {
  medicationCodes?: { values: string[] | null; display: string[] | null }; // в помпе не используется добавленно для совместимости активити клинрек и помп
  serviceCodes?: { values: string[] | null; display: string[] | null };
}
export interface IDictionaryClinrecThesis extends Omit<IClinrecThesis, "activities" | "qualityCriterion"> {
  activities: IDictionaryClinrecActivity[] | null;
  conditionParam: string;
  businessRuleParam: string;
  qualityCriterion: IDictionaryPompActivity | null;
  triggerPoints: IConfiguratorValue[] | null;
}
export interface IDictionaryClinrecStage extends Omit<IClinrecStage, "theses"> {
  theses: IDictionaryClinrecThesis[] | null;
}

export interface IDictionaryClinrec extends Omit<IClinrec, "stages"> {
  stages: IDictionaryClinrecStage[] | null;
  placingDate: Date | null;
  sort: number;
}

export interface ICreateClinrec {
  idClinrec?: number;
  clinrecName: string;
  isCustom: boolean;
  mkb10?: string[];
  ageGroup?: number[];
  revisionId?: number;
  revisionBdate?: string;
  revisionEdate?: string;
  idRubricatorMz?: number;
  status?: number | null;
  usageStatus?: number | null;
  version?: number;
  sort: number;
}

export interface ICreateClinrecStage {
  idClinrec: number;
  stageOrder: number;
  stageCode: string;
}
export interface IUpdateClinrecStage {
  idClinrec: number;
  stageOrder: number;
  currentStageCode: string;
  newStageCode: string;
}

export interface ICreateClinrecThesis extends Partial<IDictionaryClinrecThesis> {
  idClinrec: number;
  stageCode: string;
  thesisText: string;
  triggerPointCodes?: number[];
}
export interface IUpdateClinrecThesis extends ICreateClinrecThesis {
  thesisCode: string;
}

export interface ICreateClinrecActivity {
  clinrecId: number;
  thesisClinrecCode: string;
  name: string;
  comment?: string;
  medicationCodes?: string[];
  serviceCodes?: string[];
}
export interface IUpdateClinrecActivity extends ICreateClinrecActivity {
  idClinrecActivity: number;
}
