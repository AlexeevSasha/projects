import { IPompResponse } from "../IPompResponse";
import { IPompGraph } from "../IPompGraph";
import { IPompStage } from "../IPompStage";
import { IFromOrToState, IPompState } from "../IPompState";
import { IClinrecQualityCriterion } from "../clinrec/IClinrecQualityCriterion";
import { IConfiguratorValue } from "../IConfiguratorValue";
import { ICreateClinrecStage, IUpdateClinrecStage } from "./IDictionaryClinrec";

export interface IDictionaryPompActivity extends IClinrecQualityCriterion {
  medicationCodes?: { values: string[] | null; display: string[] | null };
  serviceCodes?: { values: string[] | null; display: string[] | null };
}

export interface IDictionaryState extends Omit<IPompState, "activities" | "qualityCriterion"> {
  activities: IDictionaryPompActivity[] | null;
  qualityCriterion: IDictionaryPompActivity | null;
  conditionParam: string;
  businessRuleParam: string;
  triggerPoints: IConfiguratorValue[] | null;
}

export interface IDictionaryStage extends Omit<IPompStage, "pompStates"> {
  pompStates: IDictionaryState[] | null;
}

export interface IDictionaryGraph extends Omit<IPompGraph, "pompStages" | "mkb10"> {
  pompStages: IDictionaryStage[] | null;
  mkb10: IConfiguratorValue[];
}

export interface IDictionaryPomp extends Omit<IPompResponse, "graphs"> {
  graphs: IDictionaryGraph[] | null;
}
export interface ICreatePomp {
  idPomp?: number;
  isCustom: boolean;
  profile?: number | null;
  idMz?: string;
  revisionId?: number;
  revisionBdate?: Date | string;
  revisionEdate?: Date | string;
  sort: number;
}

export interface ICreateGraph {
  idPomp: number;
  idPompGraph?: number;
  graphName: string;
  mkb10: string[];
}

export interface ICustomGraph extends IDictionaryGraph {
  setOpenPomp?: () => void;
}
export interface ICreatePompStage extends Omit<ICreateClinrecStage, "idClinrec"> {
  idGraph: number;
  idPomp: number;
}
export interface IUpdatePompStage extends Omit<IUpdateClinrecStage, "idClinrec"> {
  idGraph: number;
  idPomp: number;
}

export interface ICreatePompState
  extends Partial<
    Omit<
      IDictionaryState,
      "activities" | "qualityCriterion" | "idState" | "stateCodeXml" | " triggerPoints" | "fromState" | "toState"
    >
  > {
  triggerPointCodes?: number[];
  stageCode: string;
  stateLabel?: string;
  stateName: string;
  idPompGraph: number;
  fromState: Omit<IFromOrToState, "associatedStateDisplay">[];
  toState: Omit<IFromOrToState, "associatedStateDisplay">[];
  idPomp: number;
}
export interface IUpdatePompState extends ICreatePompState {
  idPompState: number;
}

export interface ICreatePompActivity {
  pompId: number;
  idPompState: number;
  name: string;
  comment?: string;
  serviceCodes?: string[];
}
export interface IUpdatePompActivity extends ICreatePompActivity {
  idPompActivity: number;
}
