import { CriterionExecuteResultEnum } from "../CriterionExecuteResultEnum";
import { ICases } from "../ICases";

export interface IMedicalViolationsDayInfo {
  caseCount: number;
  status: CriterionExecuteResultEnum[];
  cases: ICases[];
  day: number;
}
