import { IMedRequestDispense } from "./IMedRequestDispense";

export interface IMedRequestList {
  medreqValue: string;
  medreqInsurance: string | null;
  medreqAssigner: string | null;
  medreqRequester: string | null;
  medreqAuthoredon: Date | string | null;
  medreqPeriodStart: Date | string | null;
  medreqPeriodEnd: Date | string | null;
  medreqStatus: string | null;
  medreqPriority: string | null;
  medreqMedication: string | null;
  medreqDiagnosis: string | null;
  medreqInstruction: string | null;
  medreqRoute: string | null;
  medreqSinledose: string | null;
  medreqDose: string | null;
  medreqQuantity: number | null;
  medreqUnit: string | null;
  medreqDuration: number | null;
  medreqDurationUnitName: string | null;
  medreqDisp: IMedRequestDispense[];
}
