import { CalendarEventTypeEnum } from "../CalendarEventTypeEnum";
import { IMedDoc } from "./IMedDoc";
import { IServices } from "../IServices";

export interface IMedicalCareCase {
  caseOpenAt: Date | string;
  caseCloseAt: Date | string;
  period: string;
  duration: string;
  caseLpu: string;
  caseTypeName: string;
  diagnoses: DiagnoseCareCase[];
  calendarCaseType: CalendarEventTypeEnum;
  caseBizKey: number;
  medDoc: IMedDoc[];
  deathReason: string;
  servicesAppointed: IServices[];
  servicesExecuted: IServices[];
  servicesNoStatus: IServices[];
}

interface DiagnoseCareCase {
  diagnoseName: string;
  diagnoseType: string;
  diagnoseState: string;
  diagnoseCode: string;
}
