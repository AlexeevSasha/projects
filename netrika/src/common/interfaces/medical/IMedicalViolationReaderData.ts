import { CriterionExecuteResultEnum } from "../CriterionExecuteResultEnum";

export interface IMedicalViolationReaderData {
  status: CriterionExecuteResultEnum;
  caseId: string;
  caseData: Date | string;
}
