import { IClinrecPompQualityCriterion } from "./clinrec/IClinrecPompQualityCriterion";
import { ICustomSelect } from "./ISelect";

export interface IPompState {
  idState: number;
  stateCodeXml: string;
  stateName: string;
  stateLabel: string;
  fromState: IFromOrToState[];
  toState: IFromOrToState[];
  qualityCriterion: IClinrecPompQualityCriterion;
  activities: IClinrecPompQualityCriterion[];
  description: string | null;
}
export interface IFromOrToState {
  associatedStateId: number;
  associatedStateDisplay: string;
  timeout: number | null;
  timeoutUnit: number | null;
}
export interface IFromOrToStateForForm {
  associatedStateIdSelect: ICustomSelect;
  timeout: number | null;
  timeoutUnit: number | null;
}
