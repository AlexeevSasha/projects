export interface IRemdDocumentsResponse {
  event: IRemdDocumentsEvent[];
}

export interface IRemdDocumentsEvent {
  iemk: IRemdDocumentsIemk | null;
  odii: IRemdDocumentsOdii | null;
  odli: IRemdDocumentsOdli | null;
}

export interface IRemdDocumentsIemk {
  caseBizKey: number;
  caseOpenAt: string;
  caseCaseTypeId: string;
  documents: IRemdDocumentsIemkDoc[];
}

export interface IRemdDocumentsOdii {
  diagnosticReportBizKey: string;
  odiiDiagnosticReportCreated: string;
  diagnosticReportDisplay: string;
  documents: IRemdDocumentsOdliOdiiDoc[];
}

export interface IRemdDocumentsOdli {
  diagnosticReportBizKey: string;
  odliDiagnosticReportCreated: string;
  diagnosticReportDisplay: string;
  documents: IRemdDocumentsOdliOdiiDoc[];
}

export interface IRemdDocumentsIemkDoc {
  status?: string;
  callbackMessage?: string;
  url?: string;
  recipientSystem?: string;
  condition?: string;
  registrySmsDate?: string;
  // Мед. работник (doctor + position)
  doctor?: string;
  position?: string;
  // Организация
  organization?: string;
  diagnose?: string;
  triggerPointCode?: number;
  triggerPointName?: string;
}

export interface IRemdDocumentsOdliOdiiDoc {
  status?: string;
  callbackMessage?: string;
  url?: string;
  recipientSystem?: string;
  condition?: string;
  registrySmsDate?: string;
  // Мед. работник
  practitionerRoleFio?: string;
  // Организация
  practitionerRoleOrganization?: string;
  diagnose?: string;
  triggerPointCode?: number;
  triggerPointName?: string;
}
