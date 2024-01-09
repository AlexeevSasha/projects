import { IClinrecQualityCriterion } from "./IClinrecQualityCriterion";

export interface IClinrecThesis {
  thesisCode: string;
  number: number;
  thesisText: string;
  comment: string;
  convincing: string;
  evidential: string;
  stadia: string;
  tnm: string;
  qualityCriterion: IClinrecQualityCriterion;
  activities: IClinrecQualityCriterion[];
}
