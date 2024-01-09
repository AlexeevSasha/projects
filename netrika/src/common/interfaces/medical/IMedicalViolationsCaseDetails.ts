import { ICases } from "../ICases";
import { CriterionExecuteResultEnum } from "../CriterionExecuteResultEnum";
import { IMedicalCareCase } from "./IMedicalCareCase";

export interface IMedicalViolationsCaseDetails {
  caseId: number;
  caseDate: Date;
  cases: ICases;
  statuses: IMedicalViolationsCaseDetailsStatuses[];
  caseData: IMedicalCareCase;
}
export interface IMedicalViolationsCaseDetailsStatuses {
  id: number;
  qualityName: string;
  qualityDescription: string;
  parentId: number;
  status: CriterionExecuteResultEnum;
}
