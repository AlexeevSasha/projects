import { ICases } from "../ICases";
import { CriterionExecuteResultEnum } from "../CriterionExecuteResultEnum";

export interface IMedicalViolationsMonthInfo {
  caseCount: number;
  status: CriterionExecuteResultEnum[];
  cases: ICases[];
  month: number;
  year: number;
}
